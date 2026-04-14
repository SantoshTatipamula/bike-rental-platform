import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/owner/bookings/StatusBadge";

const UserAvatar = ({ avatar, name }) => {
  if (avatar) {
    return <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />;
  }
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";
  return (
    <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{firstLetter}</span>
    </div>
  );
};

const RecentBookings = ({ bookings }) => {
  const navigate = useNavigate();
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="bg-card rounded-xl p-4 sm:p-5 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold mb-4">Recent Bookings</h2>
      {safeBookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-3">
          {safeBookings.map((booking) => (
            <div key={booking.id}
              className="flex justify-between items-center border-b pb-3 last:border-none gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar avatar={booking.userAvatar} name={booking.userName} />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{booking.userName || "You"}</p>
                  <p className="text-xs text-textSecondary truncate">
                    {booking.bikeName} • {booking.hours} hrs
                  </p>
                </div>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/customer/bookings")}
        className="mt-4 w-full text-sm text-brand hover:underline">
        View All Bookings
      </button>
    </div>
  );
};

export default RecentBookings;
