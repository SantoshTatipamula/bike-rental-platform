import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings } from "@/services/bookingService";

import StatusBadge from "@/components/owner/bookings/StatusBadge";

const MyBookings = () => {
const { user } = useAuth();
const [bookings, setBookings] = useState([]);

useEffect(() => {
const fetchBookings = async () => {
if (!user?.uid) return;


  try {
    const data = await getUserBookings(user.uid);
    setBookings(data.reverse()); // latest first
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

fetchBookings();


}, [user]);

return ( <div className="min-h-screen bg-gray-50 p-4 md:p-6"> <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow"> <h2 className="text-xl font-semibold mb-6">My Bookings</h2>


    {bookings.length === 0 ? (
      <p className="text-sm text-gray-500">No bookings found</p>
    ) : (
      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            {/* LEFT */}
            <div>
              <p className="font-medium">{b.bikeName}</p>
              <p className="text-xs text-gray-500">
                {new Date(
                  b.createdAt?.seconds * 1000 || Date.now()
                ).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-green-600">
                ₹{b.price}
              </span>

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
