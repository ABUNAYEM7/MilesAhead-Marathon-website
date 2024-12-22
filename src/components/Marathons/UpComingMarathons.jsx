import React from 'react'
import { FaExpandArrowsAlt} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";import axios from "axios";
import CardSkeleton from '../Skeleton/LoadingSkeleton';
import Card from '../card';

const UpComingMarathons = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["/upcoming-event"],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/upcoming-event`);
          return res.data;
        },
      });
    
      if (isLoading) {
        return (
          <div className="my-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        );
      }
    
      if (isError) {
        return (
          <p className="my-12 text-center text-3xl font-bold text-red-500">
            {error}
          </p>
        );
      }
      console.log(data)
  return (
    <div className='my-6 p-4'>
      <div>
              <h3 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                <span>
                  <FaExpandArrowsAlt className="text-pinkShade" size={40} />
                </span>
                Up Coming Marathons
              </h3>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
              {data?.map((marathon) => (
                <Card key={ marathon._id} marathon ={marathon}/>
              ))}
            </div>
    </div>
  )
}

export default UpComingMarathons
