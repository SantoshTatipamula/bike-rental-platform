const BikeSummary = ({ bike }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Bike Details</h2>
      <div className="flex gap-4 items-center">
        <img
          src={bike.images?.[0]}
          alt={bike.name}
          className="w-24 h-18 sm:w-28 sm:h-20 rounded-lg object-cover flex-shrink-0"
          style={{ height: "72px" }}
        />
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{bike.name}</h3>
          <p className="text-sm text-gray-500 truncate">{bike.location}</p>
          <p className="text-orange-500 font-medium text-sm mt-1">₹{bike.pricePerHour}/hr</p>
        </div>
      </div>
    </div>
  );
};

export default BikeSummary;
