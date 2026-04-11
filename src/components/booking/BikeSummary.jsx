const BikeSummary = ({ bike }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Bike Details</h2>

      <div className="flex gap-4">
        <img
          src={bike.images?.[0]}
          className="w-28 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold">{bike.name}</h3>
          <p className="text-sm text-gray-500">{bike.location}</p>
          <p className="text-orange-500">₹{bike.pricePerHour}/hr</p>
        </div>
      </div>
    </div>
  );
};

export default BikeSummary;