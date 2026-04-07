import React from "react";

const FilterBar = ({ setIsFilterOpen }) => {
  return (

    
    <div className="flex gap-2 mb-4 lg:hidden">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="border px-4 py-2 rounded-lg text-sm"
      >
        Filter
      </button>

      <button className="border px-4 py-2 rounded-lg text-sm">Price</button>

      <button className="border px-4 py-2 rounded-lg text-sm">Type</button>
    </div>
  );
};

export default FilterBar;
