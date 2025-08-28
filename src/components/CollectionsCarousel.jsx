{/*

// src/components/CollectionsCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import s1 from "../assets/s1.jpeg";
import s2 from "../assets/s2.jpeg";
import s3 from "../assets/s3.jpeg";
import s4 from "../assets/s4.jpeg";
import s5 from "../assets/s5.jpeg";

const images = [
  { src: s1, title: "6299 HOLLYWOOD BLVD" },
  { src: s2, title: "EMBRACE" },
  { src: s3, title: "HERITAGE" },
  { src: s4, title: "ROYAL EDITION" },
  { src: s5, title: "Elegant" },
];

const CollectionsCarousel = () => {
  return (
    <div className="w-full bg-white py-16 flex flex-col items-start">
      <h2 className="text-3xl font-light text-gray-800 mb-10 pl-10">
        Our Collections
      </h2>

      <Swiper
        slidesPerView={3}          // always show 3
        centeredSlides={true}      // keep one in center
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={-150}        // overlap (staircase effect)
        className="w-full max-w-6xl"
        modules={[Autoplay]}
      >
        {images.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[350px] !h-[500px] flex justify-center items-center"
          >
            <div
              className="
                relative w-full h-full 
                shadow-xl bg-black 
                transition-all duration-500 
                swiper-slide-active:z-30 
                swiper-slide-next:z-20 
                swiper-slide-prev:z-10
              "
            >
              * Sharp edged image *
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />

             * Overlay text *
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-semibold drop-shadow-md">
                  {item.title}
                </h3>
                <button className="text-sm underline hover:text-gray-200">
                  Explore
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CollectionsCarousel;  */}


// Working as expected keep this
// src/components/CollectionsCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

// ✅ Import images correctly
import s9 from "../assets/s9.jpeg";
import s1 from "../assets/s1.jpeg";
import s5 from "../assets/s5.jpeg";
import s4 from "../assets/s4.jpeg";
import s6 from "../assets/s6.jpeg";

// ✅ Images array
const images = [
  { src: s9, title: "6299 HOLLYWOOD BLVD" },
  { src: s1, title: "EMBRACE" },
  { src: s5, title: "HERITAGE" },
  { src: s4, title: "ROYAL EDITION" },
  { src: s6, title: "Elegant" },
];

const CollectionsCarousel = () => {
  return (
  <>
    <div className="w-full bg-white py-16 flex flex-col items-start">
   {/* Heading */}
      <h2 className="text-3xl font-light font-medium text-pink-800 mb-10 pl-10">
        Our Collections
      </h2>

      {/* Swiper Carousel */}
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0, // no tilt
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
                

        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full max-w-7xl "

      >
        {images.map((item, index) => (
          <SwiperSlide
            key={index}
            className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px]   overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
                <button className="text-sm underline hover:text-gray-200">
                  Explore
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
</>
  );
};

export default CollectionsCarousel;


