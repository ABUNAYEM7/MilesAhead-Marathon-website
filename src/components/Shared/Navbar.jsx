import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import logo from '../../assets/logo.webp'

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);

  const logoutHandler = () => {
    userLogOut()
      .then((res) => {
        if (!user) {
          F;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Log Out Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        if (import.meta.env.MODE === 'production') {
          console.log(err)
        }
      });
  };

  const links = (
    <div className="flex items-center gap-4">
      <NavLink
        to={""}
        className={({ isActive }) =>
          `${
            isActive ? "text-secondary underline underline-offset-8" : ""
          } text-xs md:text-xl font-medium hover:text-secondary duration-100`
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/AllMarathons"}
        className={({ isActive }) =>
          `${
            isActive ? "text-secondary underline underline-offset-8" : ""
          } text-xs md:text-xl font-medium hover:text-secondary duration-100`
        }
      >
        Marathons
      </NavLink>
      <NavLink
        to={"/about-us"}
        className={({ isActive }) =>
          `${
            isActive ? "text-secondary underline underline-offset-8" : ""
          } text-xs md:text-xl font-medium hover:text-secondary duration-100`
        }
      >
        About Us
      </NavLink>
      {
        user?.email &&
        <NavLink
        to={"/Dashboard"}
        className={({ isActive }) =>
          `${
            isActive ? "text-secondary underline underline-offset-8" : ""
          } text-xs md:text-xl font-medium hover:text-secondary duration-100`
        }
      >
        Dashboard
      </NavLink>
      }
      {!user?.email && (
        <>
          <NavLink
            to={"/LogIn"}
            className={({ isActive }) =>
              `${
                isActive ? "text-secondary underline underline-offset-8" : ""
              } text-xs md:text-xl font-medium hover:text-secondary duration-100`
            }
          >
            Login
          </NavLink>
          <NavLink
            to={"/Registration"}
            className={({ isActive }) =>
              `${
                isActive ? "text-secondary underline underline-offset-8" : ""
              } text-xs md:text-xl font-medium hover:text-secondary duration-100`
            }
          >
            Register
          </NavLink>
        </>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 z-50 bg-gradient-to-r from-highlight to-pinkShade text-white navbar flex-col sm:flex-row justify-between gap-3 bg-base-100">
      <div className="">
        <Link 
        to={'/'}
       >
        <img 
        className="w-20 h-14 rounded-xl"
        src={logo} alt="logo" />
       </Link>
      </div>
      <div className="flex items-center gap-6">
        {/* links-container */}
        <div>{links}</div>
        {user?.email && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {/* profile-container */}
              <div className="w-10 rounded-full">
                <img
                referrerPolicy="no-referrer"
                  alt="user-profile"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              <li>
                <button
                  onClick={logoutHandler}
                  className="btn text-secondary border border-pinkShade"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
