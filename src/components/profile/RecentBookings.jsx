import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";

const statusColor = {
  approved: "text-green-600 bg-green-50",
  active: "text-blue-600 bg-blue-50",
  completed: "text-gray-600 bg-gray-100",
  rejected: "text-red-600 bg-red-50",
  pending: "text-yellow-600 bg-yellow-50",
};

const RecentBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
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
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Recent Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id}
              className="flex items-center justify-between border p-3 rounded-lg gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{b.bikeName}</p>
                <p className="text-xs text-gray-500">
                  {b.date} • {b.hours} hrs
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColor[b.status] || statusColor.pending}`}>
                  {b.status}
                </span>
                <span className="text-sm font-semibold text-brand">₹{b.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
