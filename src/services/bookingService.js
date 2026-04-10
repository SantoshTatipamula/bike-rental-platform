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

// ✅ Add booking
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      status: "pending",
      createdAt: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding booking:", error);
    return { success: false };
  }
};

// ✅ Get bookings for OWNER
export const getOwnerBookings = async (ownerId) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("ownerId", "==", ownerId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// ✅ Get bookings for USER
export const getUserBookings = async (userId) => {
  try {
    if(!userId) return [];
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};

// ✅ Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);

    await updateDoc(bookingRef, { status });

    return true;
  } catch (error) {
    console.error("Error updating booking:", error);
    return false;
  }
};