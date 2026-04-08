import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/owner/bookings/StatusBadge";

const RecentBookings = ({ bookings }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div>
                <p className="font-medium">{booking.bikeName}</p>
                <p className="text-sm text-textSecondary">
                  User ID: {booking.userId}
                </p>
              </div>

              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/owner/bookings")}
        className="mt-4 w-full text-sm text-brand hover:underline"
      >
        View All Bookings
      </button>
    </div>
  );
};

export default RecentBookings;