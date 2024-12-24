import React from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5 p-4'>
        <Helmet>
        <title>MilesAhead||Dashboard</title>
      </Helmet>
      <div className='p-4 w-full md:w-[20%] md:min-h-svh border-2 flex flex-row md:flex-col md:gap-3 gap-6 justify-center md:justify-start '>
      <NavLink
        to={""}
        end
        className={({ isActive }) =>
          `${
            isActive ? "text-highlight underline underline-offset-8" : ""
          } text-base md:text-xl font-medium hover:text-pinkShade duration-100`
        }
      >
        Add Marathon
      </NavLink>
      <NavLink
        to={"MyMarathonList"}
        className={({ isActive }) =>
          `${
            isActive ? "text-highlight underline underline-offset-8" : ""
          } text-base md:text-xl font-medium hover:text-pinkShade duration-100`
        }
      >
        My Marathon List
      </NavLink>
      <NavLink
        to={"MyApplyList"}
        className={({ isActive }) =>
          `${
            isActive ? "text-highlight underline underline-offset-8" : ""
          } text-base md:text-xl font-medium hover:text-pinkShade duration-100`
        }
      >
        My Apply List
      </NavLink>
      </div>
      <div className='w-full md:w-2/3'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
