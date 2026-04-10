const PriceSummary = ({ price = 0, hours = 1}) => {
  const total = price * hours;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Price Details</h2>

      <div className="flex justify-between text-sm">
        <span>₹{price} x {hours}</span>
        <span>₹{total}</span>
      </div>

      <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default PriceSummary;