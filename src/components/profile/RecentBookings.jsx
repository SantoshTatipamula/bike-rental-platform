const bookings = [
  {
    id: 1,
    bike: "Royal Enfield",
    date: "12 Mar",
    status: "Completed",
  },
  {
    id: 2,
    bike: "Pulsar 220",
    date: "15 Mar",
    status: "Active",
  },
];

const RecentBookings = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Recent Bookings</h3>

      <div className="space-y-3 md:space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{b.bike}</p>
              <p className="text-sm text-slate-500">{b.date}</p>
            </div>

            <span
              className={`text-sm font-medium ${
                b.status === "Active"
                  ? "text-green-500"
                  : "text-slate-500"
              }`}
            >
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;