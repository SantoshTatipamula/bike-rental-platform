import { useState } from "react";
import { useParams } from "react-router-dom";
import  bikesData  from "../../data/bikesData";

import BookingHeader from "../../components/booking/BookingHeader";
import BikeSummary from "../../components/booking/BikeSummary";
import DateTimePicker from "../../components/booking/DateTimePicker";
import PriceSummary from "../../components/booking/PriceSummary";
import PaymentInfo from "../../components/booking/PaymentInfo";
import BookingSuccess from "../../components/booking/BookingSuccess";

const Booking = () => {
  const { id } = useParams();
  const bike = bikesData.find((b) => b.id === Number(id));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!bike) return <div>Bike not found</div>;

  const handleBooking = () => {
    if (!date || !time || hours < 1) {
      setError("Please fill all fields correctly");
      return;
    }

    setError("");
    setSuccess(true);
  };

  // 🔥 Switch UI
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

        <div className="grid md:grid-cols-2 gap-6">

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
            <PriceSummary price={bike.price} hours={hours} />

            <PaymentInfo />

            <button
              onClick={handleBooking}
              className="w-full bg-orange-500 text-white py-3 rounded-xl"
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