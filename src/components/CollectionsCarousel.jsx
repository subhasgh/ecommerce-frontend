

// Carousel slider
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
import s7 from "../assets/s7.jpeg";
import s8 from "../assets/s8.jpeg";
import s10 from "../assets/s10.jpeg"; 

// ✅ Images array
const images = [
  { src: s9, title: "6299 HOLLYWOOD BLVD" },
  { src: s1, title: "EMBRACE" },
  { src: s5, title: "HERITAGE" },
  { src: s4, title: "ROYAL EDITION" },
  { src: s6, title: "Elegant" },
   { src: s7, title: "Elite Emerald" },
    { src: s8, title: "Rocking Ruby" },
     { src: s10, title: "Stunning Saphire" },
];

const CollectionsCarousel = () => {
  return (
  <>
    <div className="w-full bg-white py-16 flex flex-col items-start">
   {/* Heading */}
      <h2 className="text-3xl font-light font-medium font-serif text-pink-800 mb-10 pl-10">
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
                 //className="w-full h-[450px] object-cover"
                className="w-[850px] h-[850px] object-cover"
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


