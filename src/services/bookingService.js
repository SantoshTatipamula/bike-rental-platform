const BOOKING_KEY = "bike_bookings";

export const getBookings = () => {
  return JSON.parse(localStorage.getItem(BOOKING_KEY)) || [];
};

export const saveBookings = (bookings) => {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
};

export const addBooking = (booking) => {
  const bookings = getBookings();

  const newBooking = {
    id: Date.now().toString(), // ✅ FIX
    ...booking,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return newBooking;
};

export const getUserBookings = (userId) => {
  return getBookings().filter(
    (b) => String(b.userId) === String(userId)
  );
};

export const getOwnerBookings = (ownerId) => {
  return getBookings().filter(
    (b) => String(b.ownerId) === String(ownerId)
  );
};

export const updateBookingStatus = (bookingId, status) => {
  const bookings = getBookings();

  const updated = bookings.map((b) =>
    String(b.id) === String(bookingId)
      ? { ...b, status }
      : b
  );

  saveBookings(updated);

  return updated; // ✅ FIX
};