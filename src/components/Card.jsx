import React from "react";
import { Link } from "react-router-dom";

const Card = ({ marathon }) => {
  const { title, location, distance, description, image,createAt } = marathon;

  return (
    <div className="my-6 relative md:max-w-[400px]   mx-auto shadow-lg rounded-lg overflow-hidden group">
      {/* Image */}
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </figure>
      {/* Card content */}
      <div className="p-4 bg-base-100">
      <div className="badge badge-secondary mb-2">Create At: {createAt}</div>
        <h3 className="text-lg font-bold">
          {title}
          </h3>
        <p className="text-sm text-gray-500 mt-2">
          {description.slice(0, 80)}...
        </p>
        <div className="flex justify-between items-center mt-4 text-sm font-medium">
          <span className="flex items-center gap-1">📍 {location}</span>
          <span>Distance : {distance}</span>
        </div>
        {marathon?.registrationStart && (
          <>
            <div className="flex justify-between items-center mt-4 text-sm font-medium">
              <div className="flex flex-col">
                <h3>Registration Start :</h3>
                <p>{marathon.registrationStart}</p>
              </div>
              <div className="flex flex-col">
                <h3>Registration End :</h3>
                <p>{marathon.registrationEnd}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm font-medium">
              <div className="flex flex-col text-pinkShade">
                <h3>Marathon Start :</h3>
                <p>{marathon.marathonStart}</p>
              </div>
              <div className="flex flex-col text-highlight">
                <h3>Total Registration :</h3>
                <p>{marathon.registrationCount}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-500/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xl font-bold">
          {marathon.registrationStart ? (
            <Link
              to={`/details/${marathon._id}`}
              className="btn bg-pinkShade text-white border-none hover:text-pinkShade"
            >
              See More
            </Link>
          ) : (
            "Coming Soon"
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
