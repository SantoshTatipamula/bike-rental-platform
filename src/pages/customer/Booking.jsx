import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addBooking } from "@/services/bookingService";
import { useAuth } from "@/context/AuthContext";
import { getBikeById } from "@/services/bikeService";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

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
  const [loading, setLoading] = useState(false);

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

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleBooking = async () => {
    if (bike.ownerId === "demo-owner") {
      setError("This is a demo bike. Booking is disabled.");
      return;
    }
    if (!bike.availability) {
      setError("This bike is currently unavailable.");
      return;
    }
    if (!user) { setError("Please login first"); return; }
    if (!date || !time || hours < 1) { setError("Please fill all fields correctly"); return; }

    setError("");
    setLoading(true);

    try {
      let ownerName = "";
      let ownerAvatar = "";
      try {
        const ownerDoc = await getDoc(doc(db, "users", bike.ownerId));
        if (ownerDoc.exists()) {
          const ownerData = ownerDoc.data();
          ownerName = ownerData.name || "";
          ownerAvatar = ownerData.avatar || "";
        }
      } catch (e) {
        console.error("Could not fetch owner info:", e);
      }

      const res = await addBooking({
        bikeId: bike.id,
        bikeName: bike.name,
        userId: user.uid,
        userName: user.name || "User",
        userAvatar: user.avatar || "",
        ownerId: bike.ownerId,
        ownerName,
        ownerAvatar,
        date,
        time,
        hours,
        price: bike.pricePerHour * hours,
        status: "pending",
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <BookingSuccess bike={bike} date={date} time={time} hours={hours} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <BookingHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          {/* LEFT */}
          <div className="space-y-4 sm:space-y-6">
            <BikeSummary bike={bike} />
            <DateTimePicker
              date={date} setDate={setDate}
              time={time} setTime={setTime}
              hours={hours} setHours={setHours}
            />
          </div>
          {/* RIGHT */}
          <div className="space-y-4 sm:space-y-6">
            <PriceSummary price={bike.pricePerHour} hours={hours} />
            <PaymentInfo />
            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl transition font-medium"
            >
              {loading ? "Confirming..." : "Confirm Booking"}
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
