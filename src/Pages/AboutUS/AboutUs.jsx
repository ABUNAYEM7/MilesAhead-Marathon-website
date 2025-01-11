import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-6 mt-32 sm:mt-16 ">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-semibold text-center text-highlight mb-6">
            About MilesAhead Marathon
          </h1>

          <p className="text-lg text-gray-700 mb-6 text-center">
            MilesAhead Marathon is more than just a race; it's a celebration of
            perseverance, passion, and community. Join us in creating lasting
            memories and pushing your limits in the journey to greatness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-pinkShade mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center">
                Our mission is to inspire individuals of all skill levels to
                challenge themselves, be part of a supportive community, and
                cross the finish line together. Whether you're a first-time
                runner or a seasoned athlete, MilesAhead is here for you.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-pinkShade mb-4">
                Our Values
              </h2>
              <ul className="text-lg text-gray-700 space-y-4 text-center">
                <li>Inclusion: Every runner is welcome.</li>
                <li>Perseverance: Push yourself beyond the limits.</li>
                <li>Community: Together we achieve more.</li>
                <li>
                  Celebration: Every achievement, big or small, is celebrated.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
            to={'/AllMarathons'}
            className="btn bg-highlight text-white hover:text-pinkShade text-lg font-semibold">
              Join the Race
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
