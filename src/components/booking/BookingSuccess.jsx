import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = ({ bike, date, time, hours }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={56} />
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Your booking for <strong>{bike?.name}</strong> on <strong>{date}</strong> at <strong>{time}</strong> for <strong>{hours} hr{hours > 1 ? "s" : ""}</strong> is pending owner approval.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/customer/bookings")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/bikes")}
            className="border px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Browse More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
