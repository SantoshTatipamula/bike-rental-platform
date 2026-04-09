import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";
import EmptyState from "@/components/common/EmptyState";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const data = getUserBookings(user.id);
      setBookings(data.reverse());
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <EmptyState message="No bookings yet"/>
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
                    {b.date} • {b.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    {b.hours} hrs
                  </p>
                </div>

                {/* Price */}
                <div className="font-semibold text-orange-500">
                  ₹{b.price}
                </div>

                {/* Status */}
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
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;