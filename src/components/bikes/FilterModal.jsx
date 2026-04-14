import React from "react";
import styles from "./FilterModal.module.css";
import FilterContent from "./FilterContent";
import { X } from "lucide-react";

const FilterModal = ({ isOpen, setIsOpen, filters, setFilters, types }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end bg-black/40 ${styles.overlay}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`bg-white w-full rounded-t-2xl p-5 ${styles.sheet} max-h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-base">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <FilterContent filters={filters} setFilters={setFilters} types={types} />

        <button onClick={() => setIsOpen(false)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4 py-2.5 rounded-lg font-medium transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
