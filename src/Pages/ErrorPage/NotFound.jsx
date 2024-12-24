import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[550px] flex flex-col items-center justify-center bg-base-100 text-center">
      {/* Illustration */}
      <img
        src="https://i.ibb.co/ncccwHj/error-Image.webp"
        alt="Page not found"
        className="w-[300px] rounded-xl"
      />

      {/* Subtitle */}
      <p className="text-xl mt-4 text-pinkShade">
        Oops! The page you are looking for doesn’t exist.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="btn bg-highlight text-white hover:text-highlight mt-8 px-6 py-3"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
