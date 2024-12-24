import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/Skeleton/LoadingSkeleton";
import Info from "../../components/Shared/Info";
import Card from "../../components/card";
import { Helmet } from "react-helmet";

const AllMarathons = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/marathons"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/marathons?allMarathons=true`
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
