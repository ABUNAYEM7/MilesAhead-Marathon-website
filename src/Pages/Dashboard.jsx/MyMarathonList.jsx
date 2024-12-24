import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CardSkeleton from "../../components/Skeleton/LoadingSkeleton";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Swal from "sweetalert2";
import "../../index.css";
import { Helmet } from "react-helmet";

const MyMarathonList = () => {
  const [err, setErr] = useState("");
  const [marathon, setMarathon] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    registrationStart: null,
    registrationEnd: null,
    marathonStart: null,
    location: "",
    distance: "",
    description: "",
    image: "",
    createdAt: format(new Date(), "P"),
  });
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/my-marathons", email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-marathons/${email}`
      );
      return res.data;
    },
  });

  // useEffect to retrieve data from marathon
  useEffect(() => {
    setFormData({
      title: marathon?.title || "",
      registrationStart: marathon?.registrationStart || "",
      registrationEnd: marathon?.registrationEnd || "",
      marathonStart: marathon?.marathonStart || "",
      location: marathon?.location || "",
      distance: marathon?.distance || "",
      description: marathon?.description || "",
      image: marathon?.image || "",
      createdAt: marathon?.createdAt || "",
    });
  }, [marathon]);

  if (isLoading) {
    return (
      <div className="my-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="my-12 text-center text-3xl font-bold text-red-500">
        {error.message || "An unknown error occurred"}
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const marathonData = {
      ...formData,
      creatorName: user?.displayName,
      creatorEmail: user?.email,
      creatorImage: user?.photoURL,
      registrationStart: formData.registrationStart
        ? format(formData.registrationStart, "P")
        : null,

      registrationEnd: formData.registrationEnd
        ? format(formData.registrationEnd, "P")
        : null,

      marathonStart: formData.marathonStart
        ? format(formData.marathonStart, "P")
        : null,

      registrationCount: 0,
    };

    // validation
    // 1. Validate Registration Start Date
    if (
      !formData.registrationStart ||
      formData.registrationStart < new Date()
    ) {
      return setErr("Registration start date must not be in the past.");
    }

    // 2. Validate Registration End Date
    if (
      !formData.registrationEnd ||
      formData.registrationEnd < formData.registrationStart
    ) {
      return setErr(
        "Registration end date must be after the registration start date."
      );
    }

    // 3. Validate Marathon Start Date
    if (
      !formData.marathonStart ||
      formData.marathonStart <= formData.registrationEnd
    ) {
      return setErr(
        "Marathon start date must be after the registration end date."
      );
    }

    // 4. Validate Created At (Marathon Start Date should not be before Created At)
    if (formData.marathonStart < new Date(formData.createdAt)) {
      return setErr("Marathon start date cannot be before the created date.");
    }
    setErr("");
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/update-marathon/${id}`,
        marathonData
      )
      .then((res) => {
        if (res.data.modifiedCount>0) {
          queryClient.invalidateQueries(["/my-marathons", email]);
          document.getElementById("updateModal").close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Marathon Update Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        else if(res.data.modifiedCount === 0 && res.data.matchedCount > 0 ){
          document.getElementById("updateModal").close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Marathon Update Successfully",
            text :"You Did Not Make Changes",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const updateHandler = (id) => {
    document.getElementById("updateModal").showModal();
    const updatedMarathon = data?.filter((item) => item._id === id);
    setMarathon(updatedMarathon[0]);
  };

  const deleteHandler = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-pinkShade mr-4 text-white hover:text-pinkShade",
        cancelButton: "btn bg-highlight text-white hover:text-highlight",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_API_URL}/delete/my-marathon/${id}`)
            .then((res) => {
              {
                if (res.data.deletedCount > 0) {
                  queryClient.invalidateQueries(["/my-marathons", email]);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Marathon Deleted Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }
            })
            .catch((err) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: err.message || err.code,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Registration Info is safe :)",
            icon: "error",
          });
        }
      });
  };

  if(data?.length <= 0){
    return <h3 className="text-3xl font-bold text-pinkShade my-12 text-center">
      No Marathon Added Yet
    </h3>
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard||My Marathon List</title>
      </Helmet>
      <div>
        {/* table-container */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No:</th>
                <th className="w-20">Title</th>
                <th>Registration Date</th>
                <th>Marathon Date </th>
                <th>Create Date </th>
                <th>Distance </th>
                <th>Total Registration </th>
                <th>Update Marathon</th>
                <th>Delete Marathon</th>
              </tr>
            </thead>
            <tbody>
              {data.map((marathon, index) => (
                <tr key={marathon._id} className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>{marathon.title}</td>
                  <td>{marathon.registrationStart}</td>
                  <td>{marathon.marathonStart}</td>
                  <td>{marathon.createdAt}</td>
                  <td>{marathon.distance}</td>
                  <td>{marathon.registrationCount}</td>
                  <td>
                    <button
                      onClick={() => updateHandler(marathon._id)}
                      className="btn bg-highlight text-white hover:text-highlight"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteHandler(marathon._id)}
                      className="btn bg-pinkShade text-white hover:text-pinkShade"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* modal-container */}
        <div>
          <dialog id="updateModal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              {/* form */}
              <form
                onSubmit={(e) => handleSubmit(e, marathon?._id)}
                className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Marathon Title */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Marathon Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={marathon?.title}
                    onChange={handleChange}
                    placeholder="Enter marathon title"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                {/* Registration Start Date */}
                <div className="content-stretch">
                  <label className="block text-sm font-medium mb-2">
                    Start Registration Date
                  </label>
                  <DatePicker
                    selected={formData.registrationStart}
                    onChange={(date) =>
                      setFormData({ ...formData, registrationStart: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="input input-bordered w-full"
                    placeholderText="Select start registration date"
                    required
                  />
                </div>
                {/* Registration End Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Registration Date
                  </label>
                  <DatePicker
                    selected={formData.registrationEnd}
                    onChange={(date) =>
                      setFormData({ ...formData, registrationEnd: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="input input-bordered w-full"
                    placeholderText="Select end registration date"
                    required
                  />
                </div>
                {/* Marathon Start Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Marathon Start Date
                  </label>
                  <DatePicker
                    selected={formData.marathonStart}
                    onChange={(date) =>
                      setFormData({ ...formData, marathonStart: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="input input-bordered w-full"
                    placeholderText="Select marathon start date"
                    required
                  />
                </div>
                {/* Created At */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Created At
                  </label>
                  <input
                    type="text"
                    name="createdAt"
                    value={formData.createdAt}
                    readOnly
                    className="input input-bordered w-full max-w-[70%] bg-gray-100 cursor-not-allowed"
                  />
                </div>
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                {/* Running Distance */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Running Distance
                  </label>
                  <select
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Select distance
                    </option>
                    <option value="25k">25k</option>
                    <option value="10k">10k</option>
                    <option value="3k">3k</option>
                  </select>
                </div>
                {/* Description */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter marathon description"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    required
                  ></textarea>
                </div>
                {/* Image URL */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Marathon Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                {/* show inline error */}
                {err && <p className="text-xl font-bold text-red-600">{err}</p>}
                {/* Submit Button */}{" "}
                <button
                  type="submit"
                  className="btn bg-pinkShade text-white hover:text-highlight w-full col-span-1 md:col-span-2"
                >
                  Update Marathon
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default MyMarathonList;
