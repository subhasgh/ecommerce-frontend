import React, { useState, useRef } from "react";

const ProductGallery = ({ images, tryOnUrl }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!zoom) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!zoom || !imgRef.current) return;
    const touch = e.touches[0];
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((touch.pageX - left) / width) * 100;
    const y = ((touch.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const toggleZoom = () => {
    setZoom(!zoom);
  };

  return (
    <div>
      {/* Main Image with Zoom */}
      <div
        ref={imgRef}
        className="relative overflow-hidden rounded-lg shadow-md cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
        onClick={toggleZoom} // For TV/PC remote & mobile tap
        onTouchStart={toggleZoom}
        onTouchMove={handleTouchMove}
      >
        <img
          src={mainImage}
          alt="Jewelry"
          className="w-full h-auto rounded-lg transition-transform duration-300"
          style={
            zoom
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${position.x}% ${position.y}%`,
                  cursor: "zoom-out",
                }
              : { transform: "scale(1)" }
          }
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
              mainImage === img ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => {
              setMainImage(img);
              setZoom(false);
            }}
          />
        ))}
      </div>

      {/* Try-On Button */}
      {tryOnUrl && (
        <a
          href={tryOnUrl}
          target="_blank"
          rel="noreferrer"
          className="block mt-4 text-center bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
        >
          Try This Necklace On
        </a>
      )}
    </div>
  );
};

export default ProductGallery;
