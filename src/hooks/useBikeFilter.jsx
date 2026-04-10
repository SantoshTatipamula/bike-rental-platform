export const useBikeFilter = ({
  bikes,
  filters,
  sortOption,
  search,
  location,
}) => {
  let result = [...bikes];

  // 🔍 Search
  if (search) {
    result = result.filter((bike) =>
      bike.name?.toLowerCase().includes(search.toLowerCase()) ||
      bike.location?.toLowerCase().includes(search.toLowerCase()) ||
      bike.type?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 📍 Location
  if (location) {
    result = result.filter(
      (bike) =>
        bike.location?.toLowerCase().trim() ===
        location.toLowerCase().trim()
    );
  }

  // 💰 Price (SAFE FIX 🔥)
  result = result.filter((bike) => {
    const price = Number(bike.pricePerHour);
    return (
      price &&
      price >= filters.minPrice &&
      price <= filters.maxPrice
    );
  });

  // 🏍 Type
  if (filters.types.length > 0) {
    result = result.filter((bike) =>
      bike.type && filters.types.includes(bike.type)
    );
  }

  // ✅ Availability
  if (filters.availableOnly) {
    result = result.filter((bike) => bike.availability === true);
  }

  // 🔥 SORT
  if (sortOption === "low-high") {
    result.sort((a, b) =>
      Number(a.pricePerHour) - Number(b.pricePerHour)
    );
  } else if (sortOption === "high-low") {
    result.sort((a, b) =>
      Number(b.pricePerHour) - Number(a.pricePerHour)
    );
  }

  return result;
};