import React from "react";

const Card = ({ marathon }) => {
  const { title, location, distance, description, image } = marathon;

  return (
    <div className="my-6 relative max-w-[400px] mx-auto shadow-lg rounded-lg overflow-hidden group">
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
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{description.slice(0, 80)}...</p>
        <div className="flex justify-between items-center mt-4 text-sm font-medium">
          <span className="flex items-center gap-1">
            📍 {location}
          </span>
          <span>Distance : {distance}</span>
        </div>
      </div>
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-500/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xl font-bold">Coming Soon</p>
      </div>
    </div>
  );
};

export default Card;
