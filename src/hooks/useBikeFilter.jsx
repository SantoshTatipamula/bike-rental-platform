export const useBikeFilter = ({
  bikes,
  filters,
  sortOption,
  search,
  location,
}) => {
  let result = [...bikes];

  // 🔍 Search filter
  // 🔍 Search filter
if (search) {
  result = result.filter((bike) =>
    bike.name.toLowerCase().includes(search.toLowerCase()) ||
    bike.location.toLowerCase().includes(search.toLowerCase()) ||
    bike.type.toLowerCase().includes(search.toLowerCase())
  );
}

  // 📍 Location filter
  if (location) {
    result = result.filter((bike) => bike.location === location);
  }

  // 💰 Price filter
  // 💰 Price filter
result = result.filter(
  (bike) =>
    bike.price >= filters.minPrice &&
    bike.price <= filters.maxPrice
);

  // 🏍 Type filter
  if (filters.types.length > 0) {
    result = result.filter((bike) => filters.types.includes(bike.type));
  }

  // ✅ Availability filter
  if (filters.availableOnly) {
    result = result.filter((bike) => bike.available);
  }

// 🔥 SORT (IMPORTANT FIX)
  let sorted = [...result];

  if (sortOption === "low-high") {
    sorted.sort((a, b) => a.price - b.price);
  }

  else if (sortOption === "high-low") {
    sorted.sort((a, b) => b.price - a.price);
  }
else{
  return result;
}
  return sorted;
};
