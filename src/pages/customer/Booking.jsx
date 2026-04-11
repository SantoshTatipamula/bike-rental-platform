import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addBooking } from "@/services/bookingService";
import { useAuth } from "@/context/AuthContext";
import { getBikeById } from "@/services/bikeService";

// components
import BookingHeader from "../../components/booking/BookingHeader";
import BikeSummary from "../../components/booking/BikeSummary";
import DateTimePicker from "../../components/booking/DateTimePicker";
import PriceSummary from "../../components/booking/PriceSummary";
import PaymentInfo from "../../components/booking/PaymentInfo";
import BookingSuccess from "../../components/booking/BookingSuccess";
import Loader from "@/components/common/Loader";

const Booking = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [bike, setBike] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 🔥 Fetch bike (async fix)
  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await getBikeById(id);
        setBike(data);
      } catch (err) {
        console.error(err);
        setError("Bike not found");
      }
    };

    fetchBike();
  }, [id]);

  // 🔥 Loading state
  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader/>
      </div>
    );
  }

  // 🔥 Booking handler
  const handleBooking = async () => {
    // Block Demo Bikes Booking
    if (bike.ownerId === "demo-owner") {
    alert("This is a demo bike. Booking is disabled.");
    return;
  }

  if (!user) {
    setError("Please login first");
    return;
  }

  if (!date || !time || hours < 1) {
    setError("Please fill all fields correctly");
    return;
  }

  setError("");

  try {
    const res = await addBooking({
      bikeId: bike.id,
      bikeName: bike.name,
      userId: user.uid,
      userName: user.name || "User",
      userAvatar:user.avatar || "",
      ownerId: bike.ownerId,
      date,
      time,
      hours,
      price: bike.pricePerHour * hours,
      status: "pending",
    });

    if (res.success) {
      setSuccess(true);
    } else {
      setError("Booking failed");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  }
};

  // 🔥 Success UI
  if (success) {
    return (
      <BookingSuccess
        bike={bike}
        date={date}
        time={time}
        hours={hours}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <BookingHeader />

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">

          {/* LEFT */}
          <div className="space-y-6">
            <BikeSummary bike={bike} />

            <DateTimePicker
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              hours={hours}
              setHours={setHours}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <PriceSummary price={bike.pricePerHour} hours={hours} />

            <PaymentInfo />

            <button
              onClick={handleBooking}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
            >
              Confirm Booking
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Booking;