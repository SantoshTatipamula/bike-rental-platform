import React from "react";
import FilterContent from "./FilterContent";
import SortDropdown from "./SortDropdown";

const FilterSidebar = ({
  filters,
  setFilters,
  types,
  sortOption,
  setSortOption,
}) => {
  return (
    <>
      <div className="mb-5">
        <p className="text-sm mb-2">Sort By</p>
        <div className="left-0">
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>
      <h2 className="font-semibold mb-4">Filters</h2>
      {/* Price */}
      <FilterContent filters={filters} setFilters={setFilters} types={types} />
    </>
  );
};

export default FilterSidebar;
