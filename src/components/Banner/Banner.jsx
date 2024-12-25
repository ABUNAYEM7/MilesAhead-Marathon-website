import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import image1 from "../../assets/banner1.jpg";
import image2 from "../../assets/banner2.jpg";
import image3 from "../../assets/banner3.webp";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate()

  const exploreHandler = ()=>{
    navigate('/AllMarathons')
  } 

  return (
    <div className="h-[600px]  rounded-xl">
      <Swiper
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{
          delay: 2000, // Slide changes every 2 seconds
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide className="h-full rounded-xl">
          <div className="relative h-full">
            <img
              src={image1}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-start px-6">
              <div className="bg-black/50 backdrop-blur-md text-white p-6 rounded-lg max-w-lg">
                <h2 className="text-3xl font-bold">
                  Discover Your True Potential
                </h2>
                <p className="mt-2 text-sm">
                  Explore the most challenging and rewarding marathon event.
                  Push your boundaries, exceed your limits, and achieve your
                  goals!
                </p>
                <button
                onClick={exploreHandler}
                className="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="h-full rounded-xl">
          <div className="relative h-full">
            <img
              src={image2}
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-md text-white p-6 rounded-lg max-w-lg text-center">
                <h2 className="text-3xl font-bold">Join the MilesAhead Journey</h2>
                <p className="mt-2 text-sm">
                  Participate in a transformative experience that celebrates
                  endurance, passion, and the spirit of community.
                </p>
                <button 
                onClick={exploreHandler}
                className="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="h-full rounded-xl">
          <div className="relative h-full">
            <img
              src={image3}
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-end px-6">
              <div className="bg-black/50 backdrop-blur-md text-white p-6 rounded-lg max-w-lg text-right">
                <h2 className="text-3xl font-bold">Achieve Your Personal Best</h2>
                <p className="mt-2 text-sm">
                  Conquer the challenges and experience the thrill of crossing
                  the finish line stronger than ever before.
                </p>
                <button 
                onClick={exploreHandler}
                className="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="custom-pagination"></div>
    </div>
  );
}
