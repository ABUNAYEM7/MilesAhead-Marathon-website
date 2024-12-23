import { useQuery } from "@tanstack/react-query";
import { FaExpandArrowsAlt} from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6"
import axios from "axios";
import CardSkeleton from "../Skeleton/LoadingSkeleton";
import {Link} from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Marathons = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/marathons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/marathons`);
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
        {error.message || 'An unknown error occurred'}
      </p>
    );
  }

  const calculateTimeLeft =(duration)=>{
    const endDate = new Date(duration).getTime()
    const currentDate = Date.now()
    const result = Math.max((endDate - currentDate)/1000,0)
    return result
  }

  return (
    <div>
      <div>
        <h3 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
          <span>
            <FaExpandArrowsAlt className="text-highlight" size={40} />
          </span>
          Discover Marathons
        </h3>
      </div>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        {data?.map((marathon) => (
          <div 
          key={marathon._id }
          className="card bg-base-100 max-w-[400px] max-h-[400px] image-full shadow-xl">
            <figure>
              <img
              className="w-full object-cover object-center"
                src={marathon.image}
                alt="image"
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title text-white">{marathon.title}</h2>
              <p className="text-white  font-medium">{marathon.description.slice(0,80)}...</p>
              <p className="text-white text-base font-medium flex items-center gap-1">
                <FaLocationCrosshairs/> Location : {marathon.location}</p>
              <div className="card-actions justify-between items-center mt-3">
              <CountdownCircleTimer
                isPlaying
                duration={calculateTimeLeft(marathon?.registrationEnd)}
                size={100}
                colors={["#004777", "#F7B801", "#A30000"]}
                colorsTime={[10, 5, 0]} // Change color thresholds
                onComplete={() => ({ shouldRepeat: false })}
                >
                  {({remaining})=>{
                    
                    if(remaining > 0){
                      const days = Math.floor(remaining /(3600 * 24))
                      const hours = Math.floor((remaining % (3600*24)) / 3600)
                      const minutes = Math.floor((remaining % 3600) / 60) 
                      const seconds = Math.floor(remaining % 60)

                      return (
                        <div className="text-center text-xs text-white font-bold">
                          {days > 0 && `${days}d `}
                          {hours > 0 && `${hours}h `}
                          {minutes > 0 && `${minutes}m `}
                          {seconds}s
                        </div>
                      );
                     }
                     return <div className="text-center text-xs text-pinkShade font-bold">Expired</div>;
                  }}
                </CountdownCircleTimer>
                <Link 
                to={`/details/${marathon._id}`}
                className="btn bg-highlight text-white hover:text-highlight border-none">See Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marathons;
