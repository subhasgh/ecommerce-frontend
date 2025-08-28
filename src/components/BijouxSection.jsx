import React from "react";
import nutmegLogo from "../assets/nutmeg-logo.png"; // ✅ make sure path is correct

const BijouxSection = () => {
  return (
    <div className="mt-10">
      {/* --- Header Branding --- */}
      <div className="flex justify-center items-center gap-3 mb-12">
        <img
          src={nutmegLogo}
          alt="Nutmeg Logo"
          className="h-10 w-10 object-contain"
        />
        <p className="text-lg font-light tracking-wide text-gray-700">
          Bijoux, A Nutmeg Product
        </p>
      </div>

      {/* --- The Bijoux Promise Section --- */}
      <div className="mt-16 border-t pt-10">
        <h2 className="text-2xl font-serif text-center mb-10">
          The Bijoux Promise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-10 text-gray-800">
          {/* Ethically Sourced */}
          <div>
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 2l4 8h8l-6 6 2 8-8-5-8 5 2-8-6-6h8l4-8z"
                />
              </svg>
            </div>
            <p className="font-medium text-lg">Ethically Sourced</p>
            <p className="text-sm text-gray-600">Responsibly crafted</p>
          </div>

          {/* Sealed Assurance */}
          <div>
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6-2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5z"
                />
              </svg>
            </div>
            <p className="font-medium text-lg">Sealed Assurance</p>
            <p className="text-sm text-gray-600">Certified & guaranteed</p>
          </div>

          {/* Upgrade Your Jewellery */}
          <div>
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 12l5 5L20 7"
                />
              </svg>
            </div>
            <p className="font-medium text-lg">Upgrade Your Jewellery</p>
            <p className="text-sm text-gray-600">Exchange & upgrade offers</p>
          </div>

          {/* Nutmeg Product */}
          <div>
            <div className="flex justify-center mb-4">
              <img
                src={nutmegLogo}
                alt="Nutmeg Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <p className="font-medium text-lg">Nutmeg Product</p>
            <p className="text-sm text-gray-600">Trusted craftsmanship</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BijouxSection;
