import React from "react";
import {useNavigate} from "react-router-dom";

const BikeCard = ({ bike }) => {

  const navigate = useNavigate();

  const handleview = ()=>{
    navigate(`/bikes/${bike.id}`);
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-md transition">
      {/* Image */}
      <img
        src={bike.image?.[0]}
        alt={bike.name}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4 sm:p-3 lg:p-4">
        <div className="flex justify-between items-center mt-2">
          <h3 className="font-semibold text-gray-800">{bike.name}</h3>

          <span className="text-sm text-gray-600">⭐ {bike.rating}</span>
        </div>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          📍 {bike.location}
        </p>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-3 sm:mt-2 lg:mt-3">
          <p className="text-lg font-semibold text-green-600">
            ₹{bike.price}/hr
          </p>

          <button onClick={handleview} className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm shadow hover:scale-105 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
};
export default BikeCard;
