import React from "react";
import BikeCard from "@/components/bikes/BikeCard";
import EmptyState from "@/components/common/EmptyState";

const BikeGrid = ({ bikes }) => {
  if (!bikes.length) {
    return <EmptyState message="No bikes found matching your filters" />;
  }
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

export default BikeGrid;
