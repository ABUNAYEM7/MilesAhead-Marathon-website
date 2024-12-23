import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardSkeleton from '../../components/Skeleton/LoadingSkeleton';

const MarathonDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/marathons/details/', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/marathons/details/${id}`);
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

  const {
    _id,
    createAt,
    description,
    distance,
    image,
    location,
    marathonStart,
    registrationCount,
    registrationEnd,
    registrationStart,
    title,
  } = data;

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full max-h-[550px] object-cover object-center" />

        <div className="p-6">
          <div className="text-sm font-medium text-gray-500 flex justify-between items-center">
            <span className='text-pinkShade'>📍 {location}</span>
            <span className='text-highlight'>Distance: {distance}</span>
          </div>
          <h1 className="text-3xl font-bold my-4">{title}</h1>
          <p className="text-gray-700 mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Registration</h2>
              <p className="text-gray-600">
                <span className="font-medium">Start:</span> {registrationStart}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">End:</span> {registrationEnd}
              </p>
            </div>

            {/* Right Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Marathon</h2>
              <p className="text-gray-600">
                <span className="font-medium">Start:</span> {marathonStart}
              </p>
            </div>
          </div>

          {/* Created At */}
          <div className="mt-6 md:w-[70%] lg:w-[65%]  flex flex-col md:flex-row gap-3  justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Created At:</span> {createAt}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Total Registration:</span> {registrationCount}
            </p>
          </div>

          {/* Register Button */}
          <div className="mt-8 text-center">
            <Link 
            to={`/apply-marathon/${_id}`}
            className="btn bg-highlight text-white hover:bg-pinkShade px-6 py-2 rounded-md">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
