import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import CardSkeleton from "../../components/Skeleton/LoadingSkeleton";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyApplyList = () => {
  const [marathon, setMarathon] = useState("");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/my-applied/marathons", email,search],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-applied/marathons/${email}?search=${search}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    setMarathon({
      email: marathon.email || "",
      fname: marathon.fname || "",
      lname: marathon.lname || "",
      number: marathon.number || "",
      marathonDate: marathon.marathonDate || "",
      location: marathon.location || "",
      distance: marathon.location || "",
      registrationDate: marathon.registrationDate || "",
      title: marathon.title || "",
    });
  }, []);

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
        {error.message}
      </p>
    );
  }

  const updateHandler = (id) => {
    // filtering the specific data
    const targetMarathon = data.filter((marathon) => marathon._id === id);
    setMarathon(targetMarathon[0]);
    // close-modal
    document.getElementById("updateModal").showModal();
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
            .delete(
              `${import.meta.env.VITE_API_URL}/delete/my-registration/${id}`
            )
            .then((res) => {
              {
                if (res.data.deletedCount > 0) {
                  queryClient.invalidateQueries([
                    "/my-applied/marathons",
                    email,
                  ]);
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

  const submitHandler = (e, id) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    // sending patch request to backend
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/update-apply/marathon/${id}`,
        data
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          queryClient.invalidateQueries(["/my-applied/marathons", email]);
          document.getElementById("updateModal").close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Update Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data.modifiedCount === 0 && res.data.matchedCount > 0) {
          document.getElementById("updateModal").close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Update Successfully",
            text: "You Did Not Make Changes",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // check data length
  if (data?.length <= 0) {
    return (
      <h3 className="text-3xl font-bold text-pinkShade my-12 text-center">
        No Marathon Added Yet
      </h3>
    );
  }

  console.log(search)

  return (
    <div>
      <Helmet>
        <title>Dashboard||Marathon Apply List </title>
      </Helmet>
      <div className="mb-5 w-full">
        <input
          onChange={(e)=>setSearch(e.target.value)}
          type="text"
          placeholder="Search here"
          className="input input-bordered input-info w-full"
        />
      </div>
      {/* table-container */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No:</th>
              <th className="w-20">Title</th>
              <th>First Name</th>
              <th>First Name</th>
              <th>Contact Number</th>
              <th>Registration Date</th>
              <th>Marathon Date </th>
              <th>Location </th>
              <th>Distance </th>
              <th>Update Marathon</th>
              <th>Delete Marathon</th>
            </tr>
          </thead>
          <tbody>
            {data.map((marathon, index) => (
              <tr key={marathon._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{marathon.title}</td>
                <td>{marathon.fname}</td>
                <td>{marathon.lname}</td>
                <td>{marathon.number}</td>
                <td>{marathon.registrationDate}</td>
                <td>{marathon.marathonDate}</td>
                <td>{marathon.location}</td>
                <td>{marathon.distance}</td>
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
          <div className="modal-box w-11/12 max-w-5xl bg-registerBg">
            {/* form */}
            <form
              onSubmit={(e) => submitHandler(e, marathon?._id)}
              className="card-body grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* marathon title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marathon Title</span>
                </label>
                <input
                  defaultValue={marathon?.title}
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  defaultValue={marathon?.email}
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              {/* First name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  defaultValue={marathon?.fname}
                  name="fname"
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Last name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  defaultValue={marathon?.lname}
                  name="lname"
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Mobile No */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  defaultValue={marathon?.number}
                  name="number"
                  type="text"
                  pattern="\d*"
                  title="Please enter a valid number"
                  placeholder="Mobile Number"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Marathon Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Marathon Date :</span>
                </label>
                <input
                  defaultValue={marathon?.marathonDate}
                  name="marathonDate"
                  type="date"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              {/* Location*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  defaultValue={marathon?.location}
                  name="location"
                  type="text"
                  placeholder="Location"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              {/* Distance*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Distance</span>
                </label>
                <input
                  defaultValue={marathon?.distance}
                  name="distance"
                  type="text"
                  placeholder="Distance"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control mt-6 col-span-1 md:col-span-2">
                <button className="btn bg-pinkShade text-white hover:text-pinkShade">
                  Update the Race
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyApplyList;
