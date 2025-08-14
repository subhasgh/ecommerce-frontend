import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
import Flag from "../components/Flag.jsx";

import hisImage from "../assets/Hims.jpeg";
import herImage from "../assets/Hers.jpeg";
import dealImage from "../assets/Deal.jpeg";
import deal1Image from "../assets/Deal1.jpeg";
import deal2Video from "../assets/Deal2.mp4";

import "../styles/glitter.css";

const HomePage = () => {
  const videoRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Video must be at least 50% visible to play
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoVisible) {
        videoRef.current.play().catch(() => {}); // Play if visible
      } else {
        videoRef.current.pause(); // Pause if hidden
      }
    }
  }, [isVideoVisible]);

  const offers = [
    { id: 1, type: "image", src: dealImage, alt: "Special Deal 1" },
    { id: 2, type: "image", src: deal1Image, alt: "Special Deal 2" },
    { id: 3, type: "video", src: deal2Video, alt: "Special Deal 3" },
  ];

  return (
    <>
      <Flag />
      <Header />
      <ImageCarousel />

      <div className="bg-gradient-to-br from-yellow-50 to-pink-50 min-h-screen p-6">
        {/* His & Hers Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          {/* His Collection */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={hisImage}
              alt="His Collection"
              className="w-full h-[900px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">His</h2>
              <p className="text-green-800 font-medium mb-4">
                Elegant and bold style for him
              </p>
              <Link
                to="/products"
                className="text-pink-600 hover:underline font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Her Collection */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={herImage}
              alt="Her Collection"
              className="w-full h-[900px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">Hers</h2>
              <p className="text-green-800 font-medium mb-4">
                Graceful and timeless designs for her
              </p>
              <Link
                to="/products"
                className="text-pink-600 hover:underline font-medium"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

 {/* Glitter Scrolling Heading */}
        <div className="marquee-container py-4">
           <div className="marquee-content">
         {/* <span className="marquee-text">
          Limited-Time Luxury Offers
          </span> */} 
 <span className="marquee-text">
            Limited-Time Luxury Offers
          </span>
        </div>
</div>

       {/* Special Offers */}
<div className="text-center py-8">
  {/* <h2 className="text-2xl font-semibold text-green-700 mb-6">
   Limited-Time Luxury Offers
  </h2> */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {offers.map((offer) => (
      <Link
        key={offer.id}
        to="/products"
        className="bg-white shadow-md rounded-lg hover:shadow-xl transition block cursor-pointer"
      >
        {offer.type === "image" ? (
          <img
            src={offer.src}
            alt={offer.alt}
            className="w-full h-96 object-cover rounded"
          />
        ) : (
          <video
            ref={videoRef}
            src={offer.src}
            loop
            muted
            playsInline
            className="w-full h-96 object-cover rounded"
          />
        )}
      </Link>
    ))}
  </div>
</div>
             
      </div>
    </>
  );
};

export default HomePage;
