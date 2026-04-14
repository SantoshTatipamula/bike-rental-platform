import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// ✅ Get all bikes
export const getAllBikes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "bikes"));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching bikes:", error);
    return [];
  }
};

// ✅ Get bike by ID
export const getBikeById = async (id) => {
  try {
    const bikeRef = doc(db, "bikes", id);
    const snap = await getDoc(bikeRef);

    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// ✅ Add bike
export const addBike = async (bike) => {
  try {
    const docRef = await addDoc(collection(db, "bikes"), {
      ...bike,
      createdAt: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

// ✅ Delete bike
export const deleteBike = async (id) => {
  await deleteDoc(doc(db, "bikes", id));
};

// ✅ Toggle availability
export const toggleAvailability = async (id) => {
  const bikeRef = doc(db, "bikes", id);
  const snap = await getDoc(bikeRef);

  if (snap.exists()) {
    await updateDoc(bikeRef, {
      availability: !snap.data().availability,
    });
  }
};

// ✅ Update bike
export const updateBike = async (id, data) => {
  try {
    const bikeRef = doc(db, "bikes", id);
    await updateDoc(bikeRef, data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};