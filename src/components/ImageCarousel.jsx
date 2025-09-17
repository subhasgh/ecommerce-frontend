{/*

import React, { useRef, useEffect } from "react";

// Import images directly so Webpack/Vite resolves paths correctly
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpeg";
import banner6 from "../assets/banner6.jpeg";
import banner7 from "../assets/banner7.jpeg";
import banner8 from "../assets/banner8.jpeg";

const images = [
  banner1, banner2, banner3, banner4,
  banner5, banner6, banner7, banner8
];

export default function ImageCarousel() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 2; // pixels per frame
    const interval = setInterval(() => {
      container.scrollLeft += scrollSpeed;
      scrollAmount += scrollSpeed;

      // Reset scroll when half of the total width has been scrolled
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
        scrollAmount = 0;
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
    */}  {/* // Duplicate array for infinite scroll 
      {[...images, ...images].map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`banner-${idx}`}
          style={{
            flexShrink: 0,
           width: "screen",
           height: "400px",
            objectFit: "contain", // keep full HD without cropping
          //  className="w-full h-[900px] object-cover"

          }}
        />
      ))}
    </div>
  );
}

*/}

{/*  Right Scrolling code

import { useState, useEffect } from "react";
// star slash curly bracket  import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpeg";
import banner6 from "../assets/banner6.jpeg";
import banner7 from "../assets/banner7.jpeg";
import banner8 from "../assets/banner8.jpeg";
// star slash curly bracket
import m2 from "../assets/m2.jpeg";
import b2 from "../assets/b2.jpeg";
import m3 from "../assets/m3.jpeg";
import b5 from "../assets/b5.jpeg";
import m5 from "../assets/m5.jpeg";
import m1 from "../assets/m1.jpeg";
import l1 from "../assets/l1.jpeg";
import l2 from "../assets/l2.jpeg";
import banner1 from "../assets/banner1.jpg";
import banner1 from "../assets/banner1.jpg";
// const images = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8];
const images = [m2, b2, m3, m5, b5, m1, l1, l2];


export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // changes every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "400px", // adjust as needed
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: "transform 0.6s ease-in-out",
          transform: `translateX(-${index * 100}%)`,
          height: "100%",
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            style={{ width: "100%", flexShrink: 0, height: "auto", objectFit: "contain" }}
            // className="h-[700px] w-screen object-cover flex-shrink-0"

         
 />
      ))}
      </div>
</div>
  );
}

 */}









import { useState, useEffect } from "react";

import banner8 from "../assets/banner8.jpeg";
//import b3 from "../assets/b3.jpeg";
//import m4 from "../assets/m4.jpeg";
//import b4 from "../assets/b4.jpeg";
//import m5 from "../assets/m5.jpeg";
//import m1 from "../assets/m1.jpeg";
//import l1 from "../assets/l1.jpeg";
import neb from "../assets/neb.jpeg";
import haramb from "../assets/haramb.jpeg";
import yban from "../assets/yban.jpeg";
import rban from "../assets/rban.jpeg";
import wn from "../assets/wn.jpeg";
import ba from "../assets/ba.jpeg";
import ba1 from "../assets/ba1.jpeg";
//import ba2 from "../assets/ba2.jpeg";

const images = [neb, haramb, yban, rban, wn,  ba,ba1];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedImages = [...images, images[0]]; // duplicate first image at end

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When reaching the duplicate image
    if (index === extendedImages.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0); // instantly jump back to start
      }, 600); // match your transition time

      setTimeout(() => {
        setIsTransitioning(true); // re-enable animation
      }, 700);
    }
  }, [index]);

  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: isTransitioning ? "transform 0.6s ease-in-out" : "none",
          transform: `translateX(-${index * 100}%)`,
          height: "100%",
        }}
      >
        {extendedImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            style={{
              width: "100%",
              flexShrink: 0,
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
}

