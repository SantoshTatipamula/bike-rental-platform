import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useBikeFilter } from "@/hooks/useBikeFilter";
  import { useEffect } from "react";
import BikeGrid from "@/components/bikes/BikeGrid";
import FilterBar from "@/components/bikes/FilterBar";
import FilterModal from "@/components/bikes/FilterModal";
import FilterSidebar from "@/components/bikes/FilterSidebar";
import SortBar from "@/components/bikes/SortBar";

const Bikes = () => {
  const { search, location } = useAppContext();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    minPrice: 50,
    maxPrice: 1000,
    types: [],
  });

  const [sortOption, setSortOption] = useState("");

  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");

  const bikes = [
    {
      id: 1,
      name: "Royal Enfield Classic",
      type: "cruiser",
      price: 200,
      location: "Housing Board",
      rating: 3.9,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    },
    {
      id: 2,
      name: "KTM Duke 200",
      type: "sports",
      price: 180,
      location: "Kothirampur",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1611242320536-f12d3541249b",
    },
    {
      id: 3,
      name: "Activa 6G",
      type: "scooter",
      price: 100,
      location: "Mankammathota",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d",
    },
    {
      id: 4,
      name: "Yamaha R15",
      type: "scooter",
      price: 220,
      location: "Jagtial Road",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e",
    },
    {
      id: 5,
      name: "Pulsar NS200",
      type: "cruiser",
      price: 160,
      location: "Housing Board",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65",
    },
    {
      id: 6,
      name: "TVS Apache",
      type: "scooter",
      price: 150,
      location: "Kothirampur",
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae",
    },
    {
      id: 7,
      name: "Royal Enfield Classic",
      type: "cruiser",
      price: 200,
      location: "Housing Board",
      rating: 3.9,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    },
    {
      id: 8,
      name: "KTM Duke 200",
      type: "sports",
      price: 180,
      location: "Kothirampur",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1611242320536-f12d3541249b",
    },
    {
      id: 9,
      name: "Activa 6G",
      type: "scooter",
      price: 100,
      location: "Mankammathota",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d",
    },
    {
      id: 10,
      name: "Yamaha R15",
      type: "scooter",
      price: 220,
      location: "Jagtial Road",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e",
    },
    {
      id: 11,
      name: "Pulsar NS200",
      type: "cruiser",
      price: 160,
      location: "Housing Board",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65",
    },
    {
      id: 12,
      name: "TVS Apache",
      type: "scooter",
      price: 150,
      location: "Kothirampur",
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae",
    },
  ];

  const activeFilterCount =
    filters.types.length +
    (filters.minPrice > 50 ? 1 : 0) +
    (filters.maxPrice < 1000 ? 1 : 0);

  const uniqueTypes = [...new Set(bikes.map((bike) => bike.type))];

  const formattedTypes = uniqueTypes.map(
    (type) => type.charAt(0).toUpperCase() + type.slice(1),
  );

  const filteredBikes = useBikeFilter({
    bikes,
    filters,
    sortOption,
    search,
    location,
  });




useEffect(() => {
  if (categoryFromURL) {
    setFilters({
      minPrice: 50,
      maxPrice: 1000,
      types: [categoryFromURL.toLowerCase()],
    });
  }
}, [categoryFromURL]);

  return (
    <>
      <div className="bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 w-full">
          <div className="flex gap-4 lg:gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block w-[240px]">
              <div className="bg-white  rounded-2xl p-5 shadow-md sticky top-24 border border-gray-100">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  types={uniqueTypes}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 ">
              {/* <FilterBar setIsFilterOpen={setIsFilterOpen} /> */}

              <SortBar
                sortOption={sortOption}
                setSortOption={setSortOption}
                location={location}
                activeFilterCount={activeFilterCount}
                setIsFilterOpen={setIsFilterOpen}
              />

              <BikeGrid bikes={filteredBikes} />
            </div>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        filters={filters}
        setFilters={setFilters}
        types={uniqueTypes}
      />
    </>
  );
};

export default Bikes;
