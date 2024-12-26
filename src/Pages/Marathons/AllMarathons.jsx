import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/Skeleton/LoadingSkeleton";
import Info from "../../components/Shared/Info";
import Card from "../../components/card";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";


const AllMarathons = () => {
  const [createDate, setCreateDate] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [count, setCount] = useState(0);
  const [cardPerPage,setCardPerPage] = useState(6)
  const [selected,setSelected] = useState(1)

  // calculation for page number
  const totalPage = Math.ceil(count / cardPerPage);
  const countArray = Array.from({ length: totalPage }, (_, index) => index);

  // data-fetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/marathons", createDate, registerDate,selected,cardPerPage],

    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/marathons?allMarathons=true&createDate=${createDate}&registerDate=${registerDate}&page=${selected -1}&size=${cardPerPage}`
      );
      return res.data;
    },
  });

  // to fetch te number of total data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/pagination`)

      .then((res) => setCount(res.data?.result));
  }, []);

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

  // createAtHaler
  const createAtHandler = () => {
    setRegisterDate("");
    setCreateDate("des");
  };
  
  // sortByRegisterDateHandler
  const sortByRegisterDate = () => {
    setCreateDate("");
    setRegisterDate("asc");
  };

  // reset-handler
  const resetHandler = () => {
    setCreateDate("");
    setRegisterDate("");
  };

  // select per page handler
  const selectHandler=(e)=>{
    setSelected(1)
    const perPageCard = parseInt(e.target.value)
    setCardPerPage(perPageCard)
  }

  // next button handler
  const nextHandler =()=>{
    if(selected < totalPage){
      setSelected(selected + 1)
    }
  }

    // previous button handler
  const prevHandler =()=>{
    if(selected > 1){
      setSelected(selected - 1)
    }
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
        <h3 className="text-2xl md:text-3xl font-bold text-highlight text-center ">
          Streamlining Race Data Like a Pro
        </h3>
        <p className="text-base font-medium w-11/12 md:w-2/3 mx-auto text-center">
          Effortlessly Organize, Rank, and Analyze Your Marathon Results for
          Peak Performance Insights
        </p>
        <div
          className="w-full md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 
        "
        >
          {/* sort-by createAT */}
          <button
            onClick={createAtHandler}
            className="btn bg-highlight text-white hover:text-highlight"
          >
            Sort By Create At
          </button>

          {/* Reset All */}
          <button
            onClick={resetHandler}
            className="btn bg-pinkShade text-white hover:text-pinkShade px-11"
          >
            Reset All
          </button>

          {/* sort-by distance */}
          <button
            onClick={sortByRegisterDate}
            className="btn bg-highlight text-white hover:text-highlight"
          >
            Sort By Registration Date
          </button>
        </div>
      </div>

      {/* marathon-container */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        {data?.map((marathon) => (
          <Card key={marathon._id} marathon={marathon} />
        ))}
      </div>
      {/* pagination-container */}
      <div className="my-6 p-4 flex items-center justify-center gap-2 flex-wrap">
       {/* previous-button */}
        <button 
        onClick={prevHandler}
        className="btn border-pinkShade text-pinkShade hover:text-pinkShade">Prev</button>

        {countArray?.map((num, indx) => (
          <button
            onClick={()=>setSelected(num + 1)}
            className={`${selected === num +1 ? 'btn bg-highlight  text-white hover:text-highlight':'btn border-highlight text-highlight hover:text-pinkShade'}`}
            key={indx}
          >
            {num + 1 }
          </button>
        ))}
        {/* next-button */}
        <button 
        onClick={nextHandler}
        className="btn border-pinkShade text-pinkShade hover:text-pinkShade">Next</button>
        {/* select */}
        <select 
        value={cardPerPage}
        onChange={selectHandler}
        className="select select-bordered select-xs w-full max-w-32 h-10">
          <option>3</option>
          <option>6</option>
          <option>9</option>
        </select>
      </div>
    </div>
  );
};

export default AllMarathons;
