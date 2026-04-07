import BookingCard from "./BookingCard";

const BookingList = ({ bookings }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {bookings.map((booking) => (
        <div key={booking.id} className="h-full">
          <BookingCard booking={booking} />
        </div>
      ))}

    </div>
  );
};

export default BookingList;