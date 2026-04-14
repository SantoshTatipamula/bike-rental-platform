import React, { useState, useEffect } from "react";
import { getAllBikes } from "@/services/bikeService";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useBikeFilter } from "@/hooks/useBikeFilter";

import BikeGrid from "@/components/bikes/BikeGrid";
import FilterModal from "@/components/bikes/FilterModal";
import FilterSidebar from "@/components/bikes/FilterSidebar";
import SortBar from "@/components/bikes/SortBar";
import Loader from "@/components/common/Loader";

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search, location } = useAppContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ minPrice: 50, maxPrice: 1000, types: [] });
  const [sortOption, setSortOption] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await getAllBikes();
        setBikes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      setFilters({ minPrice: 50, maxPrice: 1000, types: [categoryFromURL.toLowerCase()] });
    }
  }, [categoryFromURL]);

  const activeFilterCount =
    filters.types.length +
    (filters.minPrice > 50 ? 1 : 0) +
    (filters.maxPrice < 1000 ? 1 : 0);

  const uniqueTypes = bikes.length
    ? [...new Set(bikes.map((bike) => bike.type).filter(Boolean))]
    : [];

  const filteredBikes = useBikeFilter({ bikes, filters, sortOption, search, location });

  if (loading) return <Loader />;

  return (
    <>
      <div className="bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 w-full">
          <div className="flex gap-4 lg:gap-6">
            {/* Sidebar — large screens only */}
            <div className="hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0">
              <div className="bg-white rounded-2xl p-5 shadow-md sticky top-24 border border-gray-100">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  types={uniqueTypes}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
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
