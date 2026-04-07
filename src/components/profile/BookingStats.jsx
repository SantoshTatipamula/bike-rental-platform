const BookingStats = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow space-y-3 md:space-y-4">
      <h3 className="font-semibold">Your Activity</h3>

      <div className="flex justify-between">
        <span className="text-slate-500">Total Bookings</span>
        <span className="font-semibold">12</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">Active</span>
        <span className="text-green-500 font-semibold">2</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">Completed</span>
        <span className="font-semibold">10</span>
      </div>
    </div>
  );
};

export default BookingStats;