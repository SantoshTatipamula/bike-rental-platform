import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

// ── Notification helper ──────────────────────────────────────────
const createNotification = async (userId, message, type, bookingId) => {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      message,
      type,        // "new_booking" | "booking_approved" | "booking_rejected"
      bookingId,
      read: false,
      createdAt: new Date(),
    });
  } catch (e) {
    console.error("Notification error:", e);
  }
};

// ── Add booking ──────────────────────────────────────────────────
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      status: "pending",
      createdAt: new Date(),
    });

    // Notify owner: a customer booked their bike
    await createNotification(
      bookingData.ownerId,
      `${bookingData.userName} booked your bike "${bookingData.bikeName}". Please accept or reject.`,
      "new_booking",
      docRef.id
    );

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding booking:", error);
    return { success: false };
  }
};

// ── Get bookings for OWNER ───────────────────────────────────────
export const getOwnerBookings = async (ownerId) => {
  try {
    const q = query(collection(db, "bookings"), where("ownerId", "==", ownerId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// ── Get bookings for USER ────────────────────────────────────────
export const getUserBookings = async (userId) => {
  try {
    if (!userId) return [];
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};

// ── Update booking status + notify customer ──────────────────────
export const updateBookingStatus = async (bookingId, status, bookingData = null) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, { status });

    // Notify customer if bookingData is provided
    if (bookingData?.userId && bookingData?.bikeName) {
      const message =
        status === "approved"
          ? `Your booking for "${bookingData.bikeName}" has been accepted by the owner!`
          : `Your booking for "${bookingData.bikeName}" has been rejected by the owner.`;

      await createNotification(
        bookingData.userId,
        message,
        status === "approved" ? "booking_approved" : "booking_rejected",
        bookingId
      );
    }

    return true;
  } catch (error) {
    console.error("Error updating booking:", error);
    return false;
  }
};

// ── Get notifications for a user ─────────────────────────────────
export const getNotifications = async (userId) => {
  try {
    const q = query(collection(db, "notifications"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

// ── Mark notification as read ────────────────────────────────────
export const markNotificationRead = async (notificationId) => {
  try {
    await updateDoc(doc(db, "notifications", notificationId), { read: true });
  } catch (error) {
    console.error("Error marking notification:", error);
  }
};

// ── Mark all notifications as read ──────────────────────────────
export const markAllNotificationsRead = async (userId) => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      where("read", "==", false)
    );
    const snapshot = await getDocs(q);
    await Promise.all(
      snapshot.docs.map((d) => updateDoc(d.ref, { read: true }))
    );
  } catch (error) {
    console.error("Error marking all notifications:", error);
  }
};



// ── Approve booking ──────────────────────────────
export const approveBooking = async (bookingId) => {
  const ref = doc(db, "bookings", bookingId);

  await updateDoc(ref, {
    status: "approved",
  });
};

// ── Start ride ──────────────────────────────
export const startRide = async (bookingId) => {
  const ref = doc(db, "bookings", bookingId);

  await updateDoc(ref, {
    status: "active",
  });
};

// ── Complete ride (return bike) ──────────────────────────────
export const completeRide = async (bookingId) => {
  const ref = doc(db, "bookings", bookingId);

  await updateDoc(ref, {
    status: "completed",
    completedAt: Date.now(),
  });
};