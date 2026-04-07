import PageWrapper from "@/components/layout/PageWrapper";
import BookingList from "@/components/owner/bookings/BookingList";

const bookings = [
  {
    id: 1,
    bikeName: "Royal Enfield",
    user: "Santosh",
    date: "10 Apr 2026",
    status: "pending",
  },
  {
    id: 2,
    bikeName: "Yamaha R15",
    user: "Rahul",
    date: "12 Apr 2026",
    status: "approved",
  },
  {
    id: 3,
    bikeName: "Activa 6G",
    user: "Kiran",
    date: "15 Apr 2026",
    status: "completed",
  },
];

const OwnerBookings = () => {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto py-10 px-4">

        <h1 className="text-3xl font-bold mb-6">
          Booking Requests
        </h1>

        <BookingList bookings={bookings} />

      </div>
    </PageWrapper>
  );
};

export default OwnerBookings;