import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/services/authService";

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
  const handleUpdate = (updatedFields) => {
    const updatedData = {
      ...user,
      ...updatedFields,
    };

    // ✅ update localStorage DB
    const updatedUser = updateUser(updatedData);

    // ✅ update context (UI refresh)
    updateUserContext(updatedUser);

    setOpen(false);
  };

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