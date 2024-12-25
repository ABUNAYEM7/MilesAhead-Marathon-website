import React from 'react'
import { FaExpandArrowsAlt} from "react-icons/fa";
import Lottie from "lottie-react";
import managementLottie from "../../../public/managementLottie.json"

const  ManageYourEvent = () => {
  return (
    <div className='my-6 p-4 flex flex-col  lg:flex-row gap-5'>
      {/* left-container */}
      <div className='p-4 w-full lg:w-1/2'>

      <h3 className='text-xl sm:text-3xl font-semibold flex items-center gap-2'>
        <FaExpandArrowsAlt className="text-pinkShade" size={40} /> 
        Manage Your 
        <span className='text-highlight'>Events</span>
        </h3>

      <p className='text-2xl  font-semibold my-3'>Easy for you. Easy For Participants</p>
      <div>
        <ul className='pl-8 space-y-5'>

          <li className='text-xl font-medium list-disc list-outside'>Mobile friendly registration pathway to collect all the data you need (and none that you don’t)</li>

          <li className='text-xl font-medium list-disc list-outside'>Flexible participant management with admin and self-serve options to reduce customer service and cultivate happier participants</li>

          <li className='text-xl font-medium list-disc list-outside'>Easy access sharing across all race elements (or just a few)</li>

          <li className='text-xl font-medium list-disc list-outside'>Comprehensive reporting for your team (and your accountant)</li>

          <li className='text-xl font-medium list-disc list-outside'>Secure, reliable payment processing on a PCI Level 1 Compliant platform</li>
        </ul>
      </div>
      </div>
      {/* right-container */}
      <div className='p-4 w-full lg:w-1/2'>
      <Lottie 
      className='h-[500px]'
      animationData={managementLottie} loop={true} />
      </div>
    </div>
  )
}

export default ManageYourEvent
