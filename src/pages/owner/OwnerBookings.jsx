
import {useState, useEffect} from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getOwnerBookings,
  updateBookingStatus,
} from "@/services/bookingService";
import EmptyState from "@/components/common/EmptyState";

const OwnerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const data = getOwnerBookings(user.id);
      setBookings(data.reverse());
    }
  }, [user]);

  const handleAction = (id, status) => {
    updateBookingStatus(id, status);

    // refresh UI
    const updated = getOwnerBookings(user.id);
    setBookings(updated);
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-semibold">Booking Requests</h2>

      {bookings.length === 0 ? (
        <EmptyState message="No bookings yet" />
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between gap-4"
          >
            {/* Info */}
            <div>
              <p className="font-medium">{b.bikeName}</p>
              <p className="text-sm text-gray-500">
                User ID: {b.userId}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(b.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Price */}
            <div className="font-semibold text-brand">
              ₹{b.price}
            </div>

            {/* Status + Actions */}
            <div className="flex flex-col gap-2">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  b.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : b.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {b.status}
              </span>

              {b.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(b.id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleAction(b.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerBookings;