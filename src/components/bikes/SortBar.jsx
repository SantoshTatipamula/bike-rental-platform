import React from "react";
import styles from "./SortBar.module.css";
import SortDropdown from "./SortDropdown";
import { useState } from "react";

const SortBar = ({
  sortOption,
  setSortOption,
  location,
  activeFilterCount,
  setIsFilterOpen,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* LEFT SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
  
  {/* LEFT → Title */}
  <div className="flex items-center gap-2">
    <h2 className="font-semibold text-gray-800 text-base md:text-lg">
      {location ? `Bikes in ${location}` : "All Bikes"}
    </h2>

    {activeFilterCount > 0 && (
      <span className="text-xs bg-orange-100 text-brand px-2 py-1 rounded-full">
        {activeFilterCount}
      </span>
    )}
  </div>

  {/* RIGHT → Sort (tablet only) */}
  <div className="hidden sm:block lg:hidden">
    <SortDropdown
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  </div>

</div>
        <p className="text-xs text-gray-500">
          {location ? "Showing filtered results" : "Browse all bikes"}
        </p>

      


      {/* 🔥 MOBILE: Filter LEFT + Sort RIGHT */}
      <div className="flex items-center justify-between gap-2 sm:hidden">
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="border px-4 py-2 rounded-lg text-sm"
        >
          Filter
        </button>

        {/* Sort Dropdown */}
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption}/>
      </div>
    </div>
  );
};

export default SortBar;
