import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import BookingStats from "@/components/profile/BookingStats";
import RecentBookings from "@/components/profile/RecentBookings";
import EditProfileModal from "@/components/profile/EditProfileModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { user, updateUserContext } = useAuth();

  const handleUpdate = async (updatedFields) => {
    try {
      const updatedData = { ...user, ...updatedFields };
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updatedFields);
      updateUserContext(updatedData);
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-4 sm:p-6 space-y-4 sm:space-y-6">
      <ProfileHeader
        onEditClick={() => setOpen(true)}
        user={user}
        onImageClick={() => setShowImage(true)}
      />

      {showImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImage(false)}
        >
          <img
            src={user?.avatar || "/default-avatar.png"}
            className="max-w-full max-h-full rounded-lg object-contain"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <EditProfileModal
        open={open}
        onOpenChange={setOpen}
        user={user}
        onSave={handleUpdate}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <ProfileInfo />
        <BookingStats />
      </div>

      <RecentBookings />
    </div>
  );
};

export default Profile;
