import React, { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddMarathon = () => {
  const [formData, setFormData] = useState({
    title: "",
    registrationStart: null,
    registrationEnd: null,
    marathonStart: null,
    location: "",
    distance: "",
    description: "",
    image: "",
    createAt: format(new Date(), "P"),
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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
      formData.registrationStart < new Date().setHours(0, 0, 0, 0)
    ) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Registration Start Date",
        text: "Registration start date must not be Current Date.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // 2. Validate Registration End Date
    if (
      !formData.registrationEnd ||
      formData.registrationEnd < formData.registrationStart
    ) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Registration End Date",
        text: "Registration end date must be after the registration start date.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // 3. Validate Marathon Start Date
    if (
      !formData.marathonStart ||
      formData.marathonStart <= formData.registrationEnd
    ) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Marathon Start Date",
        text: "Marathon start date must be after the registration end date.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // 4. Validate Created At (Marathon Start Date should not be before Created At)
    if (formData.marathonStart < new Date(formData.createAt)) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Marathon Start Date",
        text: "Marathon start date cannot be before the created date.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // post data in backend
    axios
      .post(`${import.meta.env.VITE_API_URL}/add-marathon`, marathonData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congress",
            text: "Marathon is added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/AllMarathons");
        }
      })
      .catch((err) =>{
        if (import.meta.env.MODE === 'production') {
          console.log(err)
        }
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-base-100 shadow-md rounded-md">
      <Helmet>
        <title>Dashboard||Add Marathon</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-highlight mb-4">
        Create Marathon
      </h2>
      <form
        onSubmit={handleSubmit}
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
            value={formData.title}
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
          <label className="block text-sm font-medium mb-2">Created At</label>
          <input
            type="text"
            name="createAt"
            value={formData.createAt}
            readOnly
            className="input input-bordered w-full max-w-[70%] bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
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
          <label className="block text-sm font-medium mb-2">Description</label>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-pinkShade text-white hover:text-highlight w-full col-span-1 md:col-span-2"
        >
          Create Marathon
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;
