import React from "react";
import BikeCard from "@/components/bikes/BikeCard";

const BikeGrid = ({ bikes }) => {
  return (
    <div
      className="
        grid 
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4 sm:gap-5 md:gap-3 lg:gap-4
      "
    >
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

export default BikeGrid;
