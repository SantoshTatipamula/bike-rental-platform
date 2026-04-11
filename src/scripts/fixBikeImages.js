import { db } from "../firebase/firebase.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const fixBikeImages = async () => {
  try {
    const snapshot = await getDocs(collection(db, "bikes"));

    for (const bikeDoc of snapshot.docs) {
      const bike = bikeDoc.data();

      if (!bike.images || bike.images.length === 0) continue;

      const updatedImages = bike.images.map((img) => {
        if (img.includes("/src/assets/")) {
          return img.replace("/src/assets/", "/bikes/");
        }
        return img;
      });

      await updateDoc(doc(db, "bikes", bikeDoc.id), {
        images: updatedImages,
      });

      console.log(`✅ Updated bike: ${bike.name}`);
    }

    console.log("🔥 All bikes updated successfully!");
  } catch (error) {
    console.error("❌ Error updating bikes:", error);
  }
};

fixBikeImages();