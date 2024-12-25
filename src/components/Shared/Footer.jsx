import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-highlight to-pinkShade text-white py-12">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Logo and Description Section */}
        <div className="flex flex-col lg:flex-row  justify-between gap-5">
          {/* Logo/Name */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <img
              src={logo}
              alt="Marathon Logo"
              className="w-40 h-40 mb-2 sm:mb-0 object-contain rounded-2xl"
            />
            <h2 className="text-4xl font-extrabold">MilesAhead Marathon</h2>
            <p className="text-gray-200 text-lg">
              Run your race. Cross the finish line.
            </p>
          </div>
          {/* left-container */}
          <div className="flex flex-col  justify-between sm:flex-row sm:space-x-12 mt-12 sm:mt-0">
            {/* Links container */}
            <div className="flex flex-col p-2 space-y-5">
              <h3 className="text-2xl font-semibold">Quick Links</h3>
              <Link
                to="/"
                className="text-gray-100 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/Dashboard"
                className="text-gray-100 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/events"
                className="text-gray-100 hover:text-white transition-colors"
              >
                Events
              </Link>
              <Link
                to="/contact"
                className="text-gray-100 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-col  space-y-4 mt-8 sm:mt-0 p-2 gap-1">
              <h3 className="text-2xl font-semibold">Follow Us</h3>
              <div className="flex space-x-6 text-3xl">
                {/* Facebook Icon */}
                <Link
                  to="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  <FaFacebookSquare size={30} />
                </Link>

                {/* Twitter Icon */}
                <Link
                  to="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  <FaTwitterSquare size={30} />
                </Link>

                {/* Instagram Icon */}
                <Link
                  to="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  <FaInstagramSquare size={30} />
                </Link>
              </div>
              {/* news-letter-container */}
              <div className="mt-12">
                <form>
                  <h6 className="footer-title mb-0 opacity-100">Newsletter</h6>
                  <fieldset className="form-control ">
                    <label className="label">
                      <span className="label-text text-white opacity-100">
                        Enter your email address
                      </span>
                    </label>
                    <div className="gap-2 flex flex-col">
                      <input
                        type="text"
                        placeholder="username@site.com"
                        className="input input-bordered join-item"
                      />
                      <button className="btn bg-highlight text-white hover:text-pinkShade border-none ">
                        Subscribe
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-600"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} MilesAhead Marathon. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
