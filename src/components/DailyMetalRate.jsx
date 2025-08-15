
 //Top Banner style
import React from 'react';

const MetalUpdateBanner = () => {
  const goldRate = '₹5,200/gm';
  const silverRate = '₹72/gm';

  return (
    <div className="bg-yellow-100 text-yellow-900 py-1 text-center text-sm font-medium shadow">
      🔔 Today's Rates — <span className="font-bold">Gold:</span> {goldRate} | <span className="font-bold">Silver:</span> {silverRate}
    </div>
  );
};

export default MetalUpdateBanner;

{/* import React from 'react';
import { GiGoldBar } from 'react-icons/gi';
import { FaRupeeSign } from 'react-icons/fa';

const DailyMetalRate = () => {
  const goldRate = '₹5,870/g';
  const silverRate = '₹76/g';
  const date = 'August 4, 2025';

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl p-4 border border-yellow-200 z-50 w-60">
      <div className="text-sm text-gray-700 font-semibold mb-2 flex items-center">
        <GiGoldBar className="text-yellow-500 mr-2" />
        Today's Metal Rates
      </div>
      <div className="text-sm text-gray-800 flex justify-between mb-1">
        <span>Gold:</span>
        <span className="flex items-center">
          <FaRupeeSign className="text-xs mr-1" />
          5,870/g
        </span>
      </div>
      <div className="text-sm text-gray-800 flex justify-between">
        <span>Silver:</span>
        <span className="flex items-center">
          <FaRupeeSign className="text-xs mr-1" />
          76/g
        </span>
      </div>
      <div className="text-xs text-right text-gray-400 mt-1">{date}</div>
    </div>
  );
};

export default DailyMetalRate;
*/}
