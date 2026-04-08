import defaultAvatar from "@/assets/default-avatar.png";
const ProfileHeader = ({onEditClick, user, onImageClick}) => {

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
      
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
        <img
          src={user?.avatar || defaultAvatar}
          alt="profile"
          onClick={onImageClick}
          className="w-20 h-20 md:w-16 md:h-16 rounded-full object-cover cursor-pointer"
        />

        <div>
          <h2 className="text-lg md:text-xl font-semibold">{user?.name}</h2>
          <p className="text-slate-500 text-sm">{user?.email}</p>
          <p className="text-slate-500 text-sm">{user?.role}</p>
        </div>
      </div>

      <button onClick={onEditClick} className="w-full md:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;