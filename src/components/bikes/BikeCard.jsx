import React from "react";
import { useNavigate } from "react-router-dom";

const BikeCard = ({ bike }) => {
  const navigate = useNavigate();
  const handleView = () => navigate(`/bikes/${bike.id}`);
  const handleButtonClick = (e) => { e.stopPropagation(); handleView(); };

  return (
    <div
      onClick={handleView}
      className="cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-md transition h-full flex flex-col"
    >
      <div className="relative">
        <img
          src={bike.images?.[0] || "/fallback-bike.jpg"}
          alt={bike.name}
          className="h-44 w-full object-cover"
        />
        {bike.ownerId === "demo-owner" && (
          <span className="absolute top-2 left-2 text-xs bg-gray-200 px-2 py-1 rounded">
            Demo
          </span>
        )}
        {!bike.availability && (
          <span className="absolute top-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Unavailable
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{bike.name}</h3>
          <span className="text-sm text-gray-500 flex-shrink-0">⭐ {bike.rating}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          📍 {bike.location}
        </p>
        <div className="flex justify-between items-center mt-auto pt-3">
          <p className="text-base font-semibold text-green-600">₹{bike.pricePerHour}/hr</p>
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
