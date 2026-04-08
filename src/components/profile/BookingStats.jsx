import { use, useEffect,useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";
const BookingStats = () => {
  const {user} = useAuth();
  const [stats,setStats] = useState({
    total:0,
    spent:0,
  });

  useEffect(() => {
    if (user) {
      const bookings = getUserBookings(user.id);

      const total = bookings.length;
      const spent = bookings.reduce((sum, b) => sum + b.price, 0);

      setStats({ total, spent });
    }
  }, [user]);

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow space-y-3 md:space-y-4">
      <h3 className="font-semibold">Your Activity</h3>

      <div className="flex justify-between">
        <span className="text-slate-500">Total Bookings</span>
        <span className="font-semibold">{stats.total}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-500">Total Spent</span>
        <span className="text-slate-500 font-semibold">{stats.spent}</span>
      </div>
    </div>
  );
};

export default BookingStats;