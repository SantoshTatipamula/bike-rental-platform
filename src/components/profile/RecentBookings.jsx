import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";

const RecentBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const data = getUserBookings(user.id);
      setBookings(data.slice(-5).reverse()); // last 5 bookings
    }
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Recent Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{b.bikeName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(b.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className="text-sm font-semibold text-brand">
                ₹{b.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentBookings;