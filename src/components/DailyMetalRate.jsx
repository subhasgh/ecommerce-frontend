
// This page is for Daily metal rate tickler that is shown in Home page. This page calls metalBanner.css file for its styling
import React from "react";
import "../styles/metalBanner.css"; // ✅ make sure this CSS file exists

const DailyMetalRate = () => {
  const goldRate = "₹5,200/gm";
  const silverRate = "₹72/gm";

  return (
    <div className="metal-banner">
      <div className="scroll-text">
        🔔 Today's Rates — <span className="glitter">Gold:</span> {goldRate} |{" "}
        <span className="glitter">Silver:</span> {silverRate}
      </div>
    </div>
  );
};

export default DailyMetalRate;



