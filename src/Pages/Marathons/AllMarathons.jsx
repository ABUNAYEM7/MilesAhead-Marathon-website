import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/Skeleton/LoadingSkeleton";
import Info from "../../components/Shared/Info";
import Card from "../../components/card";
import { Helmet } from "react-helmet";
import { useState } from "react";

const AllMarathons = () => {
  const [createDate,setCreateDate] = useState('')
  const [registerDate,setRegisterDate] = useState('')
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/marathons",createDate,registerDate],

    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/marathons?allMarathons=true&createDate=${createDate}&registerDate=${registerDate}`
      );
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
        {error.message || "An unknown error occurred"}
      </p>
    );
  }

  // const createAtHandler=()=>{
  //   setRegisterDate('')
  //   setCreateDate('des')
  // }

  const sortByRegisterDate =()=>{
    setCreateDate('')
    setRegisterDate('asc')
  }

  const resetHandler=()=>{
    setCreateDate('')
    setRegisterDate('')
  }


  return (
    <div>
      <Helmet>
        <title>MilesAhead||All Marathons</title>
      </Helmet>
      {/* info-container */}
      <div>
        <Info
          title={"Find Your Next Marathon Challenge"}
          subtitle={
            "Browse through our comprehensive list of upcoming marathons worldwide. Whether you're aiming for a personal best or experiencing the thrill of your first race, explore events that suit your goals, from local races to international competitions. Get ready, sign up, and be part of the marathon excitement!"
          }
        />
      </div>
      {/* sorting-container */}
      <div className="my-6 p-4 space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold text-highlight text-center ">Streamlining Race Data Like a Pro</h3>
        <p className="text-base font-medium w-11/12 md:w-2/3 mx-auto text-center">
        Effortlessly Organize, Rank, and Analyze Your Marathon Results for Peak Performance Insights
        </p>
        <div className="w-full md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 
        ">
          {/* sort-by createAT */}
          <button 
          onClick={createAtHandler}
          className="btn bg-highlight text-white hover:text-highlight">Sort By Create At</button>

          {/* Reset All */}
          <button 
          onClick={resetHandler}
          className="btn bg-pinkShade text-white hover:text-pinkShade px-11">Reset All</button>

          {/* sort-by distance */}
          <button 
          onClick={sortByRegisterDate}
          className="btn bg-highlight text-white hover:text-highlight">Sort By Registration Date</button>
        </div>
      </div>
      {/* marathon-container */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        {data?.map((marathon) => (
          <Card key={marathon._id} marathon={marathon} />
        ))}
      </div>
    </div>
  );
};

export default AllMarathons;
