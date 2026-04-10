import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import bikes from "@/data/bikesData";

export const uploadBikes = async () => {
  try {
    // 🔥 Prevent duplicate uploads
    const existing = await getDocs(collection(db, "bikes"));

    if (!existing.empty) {
      console.log("⚠️ Bikes already exist. Skipping upload.");
      return;
    }

    for (let bike of bikes) {
      const formattedBike = {
        name: bike.name || "",
        type: bike.type?.toLowerCase() || "other",

        // ✅ STANDARD FIELD
        pricePerHour: Number(bike.price) || 0,
        pricePerDay: Number(bike.price) * 8 || 0,

        location: bike.location?.trim() || "",

        // ⚠️ TEMP: images (keep empty for now)
        images: [],

        rating: bike.rating || 0,

        ownerId: "demo-owner",
        availability: true,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "bikes"), formattedBike);
    }

    console.log("✅ Bikes uploaded successfully");
  } catch (error) {
    console.error("❌ Error uploading bikes:", error);
  }
};