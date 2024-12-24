import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Logo and Description Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start text-center sm:text-left space-y-8 sm:space-y-0">
          {/* Logo/Name */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <img
              src="logo.png"
              alt="Marathon Logo"
              className="w-32 h-32 mb-2 sm:mb-0 object-contain"
            />
            <h2 className="text-4xl font-extrabold">MilesAhead Marathon</h2>
            <p className="text-gray-200 text-lg">Run your race. Cross the finish line.</p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col sm:flex-row sm:space-x-12 mt-8 sm:mt-0">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold">Quick Links</h3>
              <Link to="/" className="text-gray-100 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-gray-100 hover:text-white transition-colors">About</Link>
              <Link to="/events" className="text-gray-100 hover:text-white transition-colors">Events</Link>
              <Link to="/contact" className="text-gray-100 hover:text-white transition-colors">Contact</Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:items-start space-y-4 mt-8 sm:mt-0">
              <h3 className="text-2xl font-semibold">Follow Us</h3>
              <div className="flex space-x-6 text-3xl">
                {/* Facebook Icon */}
                <Link to="#" className="text-gray-100 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22 12.073C22 6.027 17.066 1 12 1 6.934 1 2 6.027 2 12.073c0 5.075 3.657 9.352 8.452 10.66v-7.544H8.627V12.07h2.825V9.444c0-3.51 2.098-5.453 5.292-5.453 1.53 0 2.838.114 3.221.168v3.542h-2.221c-1.736 0-2.148.982-2.148 1.986v2.337h3.748l-.6 3.679h-3.148v7.544C18.343 21.425 22 17.148 22 12.073z"
                    />
                  </svg>
                </Link>

                {/* Twitter Icon */}
                <Link to="#" className="text-gray-100 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M23 3a10.2 10.2 0 01-2.828.776A4.93 4.93 0 0022.428 2a9.923 9.923 0 01-3.16 1.198A4.916 4.916 0 0016.615 2c-2.76 0-5 2.24-5 5 0 .392.045.772.13 1.139A13.935 13.935 0 011.671 3.149a5.021 5.021 0 00-.68 2.52C.99 7.21 1.925 8.826 3.1 9.732a4.904 4.904 0 01-2.25-.624v.062c0 2.44 1.735 4.488 4.043 4.95a5.035 5.035 0 01-2.227.084c.627 1.959 2.448 3.385 4.604 3.426a9.84 9.84 0 01-7.324 2.012c2.103 1.307 4.608 2.076 7.321 2.076a9.884 9.884 0 009.91-9.91c0-.15-.004-.299-.014-.447A7.04 7.04 0 0023 3z"
                    />
                  </svg>
                </Link>

                {/* Instagram Icon */}
                <Link to="#" className="text-gray-100 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 2.2c-3.106 0-5.2 2.1-5.2 5.2s2.094 5.2 5.2 5.2c3.106 0 5.2-2.1 5.2-5.2s-2.094-5.2-5.2-5.2zm0 8.4c-1.78 0-3.2-1.42-3.2-3.2 0-1.78 1.42-3.2 3.2-3.2 1.78 0 3.2 1.42 3.2 3.2 0 1.78-1.42 3.2-3.2 3.2zm6.8-6c-.898 0-1.6.702-1.6 1.6 0 .898.702 1.6 1.6 1.6s1.6-.702 1.6-1.6c0-.898-.702-1.6-1.6-1.6zm1.2 3.2c0 .8-.4 1.4-.8 1.8-.8-.4-1.8-.8-2.8-.8-1.6 0-3.2.6-4.4 1.8-.8 1.2-1.4 2.6-1.4 4.2s.6 3 1.4 4.2c1.2 1.2 2.8 1.8 4.4 1.8s3.2-.6 4.4-1.8c1.2-1.2 1.8-2.6 1.8-4.2s-.6-3-1.8-4.2c-.6-.6-1.4-.8-2.2-.8zm-6.8 6c-.6 0-1.2.4-1.2 1.2s.4 1.2 1.2 1.2 1.2-.4 1.2-1.2-.4-1.2-1.2-1.2z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-600"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} MilesAhead Marathon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
