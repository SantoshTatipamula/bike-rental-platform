import { useState, useRef, useEffect } from "react";

export default function SortDropdown({ sortOption, setSortOption, align="right"}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // 👇 Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSortOption(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="border px-4 py-2 rounded-lg text-sm bg-white shadow-sm hover:bg-gray-100"
      >
        {sortOption === "low-high"
          ? "Price: Low → High"
          : sortOption === "high-low"
            ? "Price: High → Low"
            : "Sort By"}
      </button>

      {/* Dropdown */}
      {open && (
        <div className={`absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 right-0 lg:left-0 lg:right-auto`}>
          <div
            onClick={() => handleSelect("low-high")}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Price: Low → High
          </div>

          <div
            onClick={() => handleSelect("high-low")}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Price: High → Low
          </div>
          <div
            onClick={() => handleSelect("")}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Default
          </div>
        </div>
      )}
    </div>
  );
}
