const PriceSummary = ({ price = 0, hours = 1 }) => {
  const total = price * hours;
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Price Details</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Price per hour</span>
          <span>₹{price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span>{hours} hr{hours > 1 ? "s" : ""}</span>
        </div>
        <div className="border-t pt-2 font-semibold flex justify-between text-base">
          <span>Total</span>
          <span className="text-orange-500">₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
