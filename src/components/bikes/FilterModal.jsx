import React from "react";
import styles from "./FilterModal.module.css"; // your animation CSS
import FilterContent from "./FilterContent";

const FilterModal = ({ isOpen, setIsOpen, filters, setFilters, types }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end bg-black/40 ${styles.overlay}`}
    >
      <div className={`bg-white w-full rounded-t-2xl p-4 ${styles.sheet}`}>
        <h2 className="font-semibold mb-4">Filters</h2>

        <FilterContent
          filters={filters}
          setFilters={setFilters}
          types={types}
        />

        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-orange-500 text-white mt-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
