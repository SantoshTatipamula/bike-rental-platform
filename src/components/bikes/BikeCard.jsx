import React from "react";
import { useNavigate } from "react-router-dom";
import {doc} from "firebase/firestore";

const BikeCard = ({ bike }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/bikes/${bike.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleView();
  };

  return (
    <div
      onClick={handleView}
      className="cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-md transition"
    >
      {/* Image */}
      <div className="relative">
      <img
        src={bike.images?.[0] || "/fallback-bike.jpg"}
        alt={bike.name}
        className="h-40 w-full object-cover"
      />
      {bike.ownerId === "demo-owner" && (
  <span className="absolute top-2 left-2 text-xs bg-gray-200 px-2 py-1 rounded">
    Demo
  </span>
)}
</div>

      {/* Content */}
      <div className="p-4 sm:p-3 lg:p-4">
        <div className="flex justify-between items-center mt-2">
        
          <h3 className="font-semibold text-gray-800">{bike.name}</h3>
          <span className="text-sm text-gray-600">⭐ {bike.rating}</span>
        </div>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          📍 {bike.location}
        </p>

        <div className="flex justify-between items-center mt-3 sm:mt-2 lg:mt-3">
          <p className="text-lg font-semibold text-green-600">
            ₹{bike.pricePerHour}/hr
          </p>

          <button
            onClick={handleButtonClick}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm shadow hover:scale-105 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;