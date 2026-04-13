import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import BookingStats from "@/components/profile/BookingStats";
import RecentBookings from "@/components/profile/RecentBookings";
import EditProfileModal from "@/components/profile/EditProfileModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const { user, updateUserContext } = useAuth();

  // 🔥 HANDLE SAVE
const handleUpdate = async (updatedFields) => {
  try {
    const updatedData = {
      ...user,
      ...updatedFields,
    };

    // 🔥 Update Firestore
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, updatedFields);

    // 🔥 Update context (UI refresh)
    updateUserContext(updatedData);

    setOpen(false);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// 🔥 NOTIFICATIONS


  return (
    <div className="bg-slate-50 min-h-screen px-4 py-4 md:p-6 space-y-4 md:space-y-6">
      <ProfileHeader
        onEditClick={() => setOpen(true)}
        user={user}
        onImageClick={() => setShowImage(true)}
      />

      {showImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowImage(false)}
        >
          <img
            src={user?.avatar || "/default-avatar.png"}
            className="max-w-[90%] max-h-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 🔥 PASS USER + HANDLER */}
      <EditProfileModal
        open={open}
        onOpenChange={setOpen}
        user={user}
        onSave={handleUpdate}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <ProfileInfo />
        <BookingStats />
      </div>

      <RecentBookings />
    </div>
  );
};

export default Profile;