import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardSkeleton from "../../components/Skeleton/LoadingSkeleton";
import Info from "../../components/Shared/Info";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { format, parse } from "date-fns";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import marathonLottie from "../../../public/marathonLottie.json";

const ApplyMarathon = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/marathons/details/", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/marathons/details/${id}`
      );
      return res.data;
    },
  });

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

  const { _id, distance, location, marathonStart, title } = data;

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const registrationDate = format(new Date(), "P");
    const applicantImage = user?.photoURL;
    const jobId = _id;
    form.append("registrationDate", registrationDate);
    form.append("applicantImage", applicantImage);
    form.append("jobId", jobId);
    const registerData = Object.fromEntries(form.entries());
    registerData.marathonStart = format(new Date(marathonStart), "P");
    console.log(registerData);
    axios
      .post(`${import.meta.env.VITE_API_URL}/apply-marathons`, registerData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Applied Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/Dashboard/MyApplyList");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log(err);
          return Swal.fire({
            position: "center",
            icon: "error",
            title: "Enabled To Register",
            text: "You Can't Register Twice In Same Marathon Please Try Another",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.message || err.code,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const marathonStartDate = data?.marathonStart
    ? format(parse(data.marathonStart, "MM/dd/yyyy", new Date()), "yyyy-MM-dd")
    : "";

  return (
    <div>
      <Helmet>
        <title>MilesAhead||Marathon Apply</title>
      </Helmet>
      {/* info-container */}
      <div>
        <Info
          title={" Apply for Your Next Marathon Adventure"}
          subtitle={
            "oin the running community by registering for your chosen marathon today. Whether you're chasing personal records or simply embracing the thrill of the race, take the first step toward an unforgettable experience!"
          }
        />
      </div>
      {/* main-container */}
      <div className="my-6 p-4  flex flex-col-reverse md:flex-row gap-5 ">
        <div className="w-full md:1/2 p-4 rounded-xl shadow-2xl bg-registerBg bg-no-repeat bg-cover bg-center">
          <h3 className="text-xl md:text-3xl md:font-bold my-3 text-center text-highlight">
            Joint The Race And Cross The Finish Line{" "}
          </h3>
          <form
            onSubmit={submitHandler}
            className="card-body grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* marathon title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Marathon Title</span>
              </label>
              <input
                defaultValue={title || ""}
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
                defaultValue={user?.email || ""}
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
                <span className="label-text">Contact Number</span>
              </label>
              <input
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
                defaultValue={marathonStartDate || ""}
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
                <span className="label-text text-white">Location</span>
              </label>
              <input
                defaultValue={location || ""}
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
                <span className="label-text text-white">Distance</span>
              </label>
              <input
                defaultValue={distance || ""}
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
                Join the Race
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:1/2 bg-gray-900 rounded-xl">
          <Lottie animationData={marathonLottie} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default ApplyMarathon;
