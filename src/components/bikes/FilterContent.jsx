import React from "react";

const FilterContent = ({ filters, setFilters, types }) => {
  const handleTypeChange = (type) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    setFilters({ ...filters, types: updatedTypes });
  };

  return (
    <>
      {/* Price */}
      <div className="mb-5">
        <div className="flex flex-row justify-between text-sm mb-2">
          <span>Price Range</span>
          <span className="bg-gray-100 px-1 py-1 rounded-md text-xs">
            Max ₹{filters.maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="50"
          max="800"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-brand"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹50</span>
          <span>₹{filters.maxPrice}</span>
        </div>
      </div>

      {/* Type */}
      <div className="mb-5">
        <p className="text-sm mb-2">Bike Type</p>

        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const active = filters.types.includes(type);

            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-3 py-1.5 rounded-full text-sm border transition
            ${
              active
                ? "bg-brand text-white border-green-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({ minPrice: 50,maxPrice: 1000, types: [], availableOnly: false })
        }
        className="w-full border py-2 rounded-lg text-sm hover:bg-gray-50 transition"
      >
        Reset Filters
      </button>
    </>
  );
};

export default FilterContent;
