const BookingSuccess = ({ bike, date, time, hours }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">

        <h2 className="text-2xl font-bold text-green-600 mb-3">
          Booking Requested 🚀
        </h2>

        <p className="text-gray-600 mb-6">
          Please contact the owner and complete payment to confirm your ride.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 text-left space-y-2 mb-6">
          <p><strong>Bike:</strong> {bike.name}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Duration:</strong> {hours} hrs</p>
          <p><strong>Total:</strong> ₹{bike.price * hours}</p>
        </div>

        <div className="bg-orange-50 text-orange-700 text-sm p-3 rounded-lg mb-6">
          Contact the owner via call and pay using UPI or cash.
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;