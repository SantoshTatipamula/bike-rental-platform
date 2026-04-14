import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOwnerBookings, updateBookingStatus } from "@/services/bookingService";
import EmptyState from "@/components/common/EmptyState";
import Loader from "@/components/common/Loader";

const UserAvatar = ({ avatar, name }) => {
  const [imgError, setImgError] = useState(false);
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";
  if (avatar && !imgError) {
    return (
      <img src={avatar} alt={name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={() => setImgError(true)} />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{firstLetter}</span>
    </div>
  );
};

const statusStyles = {
  approved: "bg-green-100 text-green-600",
  active: "bg-blue-100 text-blue-600",
  completed: "bg-gray-200 text-gray-700",
  rejected: "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-600",
};

const OwnerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const data = await getOwnerBookings(user.uid);
      setBookings(data.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [user]);

  const handleAction = async (booking, status) => {
    await updateBookingStatus(booking.id, status, booking);
    await fetchBookings();
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold">Booking Requests</h2>

      {bookings.length === 0 ? (
        <EmptyState message="No bookings yet" />
      ) : (
        bookings.map((b) => (
          <div key={b.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between gap-4">
            {/* Customer Info */}
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar avatar={b.userAvatar} name={b.userName} />
              <div className="min-w-0">
                <p className="font-medium truncate">{b.userName || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{b.bikeName} • {b.hours} hrs</p>
                <p className="text-xs text-gray-400">
                  {b.createdAt?.toDate ? b.createdAt.toDate().toLocaleString() : "N/A"}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="font-semibold text-brand flex sm:flex-col items-center sm:justify-center text-lg">
              ₹{b.price}
            </div>

            {/* Status + Actions */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-wrap">
              <span className={`text-xs px-3 py-1 rounded-full capitalize ${statusStyles[b.status] || statusStyles.pending}`}>
                {b.status}
              </span>

              {b.status === "pending" && (
                <div className="flex gap-2">
                  <button onClick={() => handleAction(b, "approved")}
                    className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    Accept
                  </button>
                  <button onClick={() => handleAction(b, "rejected")}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    Reject
                  </button>
                </div>
              )}
              {b.status === "approved" && (
                <button onClick={() => handleAction(b, "active")}
                  className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                  Start Ride
                </button>
              )}
              {b.status === "active" && (
                <button onClick={() => handleAction(b, "completed")}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                  Complete Ride
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerBookings;
