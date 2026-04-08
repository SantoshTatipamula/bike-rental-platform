import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getOwnerBookings,
  updateBookingStatus,
} from "@/services/bookingService";

const OwnerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    if (!user) return;
    const data = getOwnerBookings(user.id);
    setBookings(data.reverse());
  };

  useEffect(() => {
    loadBookings();
  }, [user]);

  const handleAction = (id, status) => {
    updateBookingStatus(id, status);
    loadBookings();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Booking Requests
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
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
                    {b.date} • {b.time}
                  </p>
                </div>

                {/* Price */}
                <div className="font-semibold text-orange-500">
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
                        onClick={() =>
                          handleAction(b.id, "approved")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleAction(b.id, "rejected")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default OwnerBookings;