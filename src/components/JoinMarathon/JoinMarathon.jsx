import { FaExpandArrowsAlt} from "react-icons/fa";
import marathonLottie from "../../../public/marathonLottie.json"
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const JoinMarathon = () => {
  const navigate = useNavigate()

  const joinHandler =()=>{
    navigate('/AllMarathons')
  }

  return (
    <div className="my-6 p-4 flex flex-col  lg:flex-row gap-8">
      {/* left-container */}
      <div className="p-4 w-full lg:w-1/2 bg-black rounded-xl">
        <Lottie
          className="h-[500px]"
          animationData={marathonLottie}
          loop={true}
        />
      </div>
      {/* right-container */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-xl sm:text-3xl font-semibold flex items-center gap-2">
          <FaExpandArrowsAlt className="text-highlight" size={40} />
          Join 
          <span className="text-pinkShade">MilesAhead</span>
          Club
        </h3>
        <div className="mt-6 space-y-5">
          <h3 className="text-5xl font-black from-black">Connect</h3>
          <h3 className="text-5xl font-black from-black ">Compete</h3>
          <h3 className="text-5xl font-black from-black">Celebrate</h3>
          <p className="text-base font-medium mt-6">
          Join any of our monthly virtual challenges and become part of a vibrant global community of runners. Whether you’re preparing for your next marathon or simply aiming to stay active, our challenges provide the perfect opportunity to connect with like-minded individuals, track your progress, and achieve your fitness goals. Embrace the camaraderie, share your journey, and get inspired by runners from all over the world as you work toward your personal best.
          </p>
          <button 
          onClick={joinHandler}
          className="mt-6 py-4 px-10 border-2 border-highlight text-xl font-medium">Join The Club</button>
        </div>
      </div>
    </div>
  );
};

export default JoinMarathon;
