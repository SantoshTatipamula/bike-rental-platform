import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/owner/bookings/StatusBadge";

const OwnerAvatar = ({ avatar, name }) => {
  const [imgError, setImgError] = useState(false);
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";

  if (avatar && !imgError) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{firstLetter}</span>
    </div>
  );
};

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.uid) return;
      try {
        const data = await getUserBookings(user.uid);
        const safeData = Array.isArray(data) ? data : [];
        setBookings(safeData.slice().reverse());
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <EmptyState message="No bookings yet" />
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between gap-4"
              >
                {/* Owner Info */}
                <div className="flex items-center gap-3">
                  <OwnerAvatar avatar={b.ownerAvatar} name={b.ownerName} />
                  <div>
                    <p className="text-xs text-gray-400">Owner</p>
                    <p className="font-medium text-sm">{b.ownerName || "Owner"}</p>
                  </div>
                </div>

                {/* Bike Info */}
                <div>
                  <p className="font-medium">{b.bikeName}</p>
                  <p className="text-sm text-gray-500">
                    {b.date} • {b.time}
                  </p>
                  <p className="text-sm text-gray-500">{b.hours} hrs</p>
                </div>

                {/* Price */}
                <div className="flex items-center font-semibold text-orange-500">
                  ₹{b.price}
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;