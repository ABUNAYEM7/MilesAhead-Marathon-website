import React from "react";

const CardSkeleton = () => {
  return (
    <div className="my-6 relative md:max-w-[300px] w-[340px] mx-auto shadow-lg rounded-lg overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300"></div>

      {/* Card Content Placeholder */}
      <div className="p-4 bg-base-100">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div> {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div> {/* Short description */}
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div> {/* Longer text */}

        <div className="flex justify-between items-center mt-4 text-sm font-medium">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Location */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div> {/* Distance */}
        </div>

        <div className="flex justify-between items-center mt-4 text-sm font-medium">
          <div className="flex flex-col gap-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Registration Start */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Registration End */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm font-medium">
          <div className="flex flex-col text-pinkShade gap-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Marathon Start */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="flex flex-col text-highlight gap-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Total Registration */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;