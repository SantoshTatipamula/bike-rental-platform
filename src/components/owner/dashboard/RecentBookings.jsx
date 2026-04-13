import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/owner/bookings/StatusBadge";

// Helper: shows first letter if no avatar
const UserAvatar = ({ avatar, name }) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";
  return (
    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
      <span className="text-white font-bold text-sm">{firstLetter}</span>
    </div>
  );
};

const RecentBookings = ({ bookings }) => {
  const navigate = useNavigate();
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Bookings</h2>
      </div>

      {safeBookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {safeBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div className="flex items-center gap-3">
                <UserAvatar
                  avatar={booking.userAvatar}
                  name={booking.userName}
                />
                <div>
                  <p className="font-medium">{booking.userName || "You"}</p>
                  <p className="text-sm text-textSecondary">
                    {booking.bikeName} • {booking.hours} hrs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={booking.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/customer/bookings")}
        className="mt-4 w-full text-sm text-brand hover:underline"
      >
        View All Bookings
      </button>
    </div>
  );
};

export default RecentBookings;