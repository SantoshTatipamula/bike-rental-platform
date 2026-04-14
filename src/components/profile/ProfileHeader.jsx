import { useState, useEffect } from "react";

const ProfileHeader = ({ onEditClick, user, onImageClick }) => {
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";
  const [imgError, setImgError] = useState(false);

  useEffect(() => { setImgError(false); }, [user?.avatar]);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {user?.avatar && !imgError ? (
          <img src={user.avatar} alt="profile" onClick={onImageClick}
            onError={() => setImgError(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover cursor-pointer flex-shrink-0" />
        ) : (
          <div onClick={onImageClick}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand flex items-center justify-center cursor-pointer flex-shrink-0">
            <span className="text-white text-2xl font-bold">{firstLetter}</span>
          </div>
        )}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{user?.name || "—"}</h2>
          <p className="text-slate-500 text-sm truncate max-w-[200px] sm:max-w-none">{user?.email}</p>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 capitalize">
            {user?.role}
          </span>
        </div>
      </div>
      <button onClick={onEditClick}
        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
