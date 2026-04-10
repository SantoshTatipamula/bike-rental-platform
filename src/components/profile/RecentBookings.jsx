import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";

const RecentBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user || !user.uid) return;

    const fetchBookings = async () => {
      try {
        const data = await getUserBookings(user.uid);
        setBookings(data.slice(-5).reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Recent Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="flex justify-between items-center border p-3 rounded-lg">
              <div>
                <p className="font-medium">{b.bikeName}</p>
                <p className="text-xs text-gray-500">
                  {b.createdAt
                    ? new Date(b.createdAt.seconds * 1000).toLocaleDateString()
                    : "N/A"}
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