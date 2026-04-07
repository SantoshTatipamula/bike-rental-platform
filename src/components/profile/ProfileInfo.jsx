import { useAuth } from "@/context/AuthContext";

const ProfileInfo = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-2xl shadow md:col-span-2">
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Full Name</p>
          <p className="font-medium">{user?.name || "—"}</p>
        </div>

        <div>
          <p className="text-slate-500">Email</p>
          <p className="font-medium">{user?.email || "—"}</p>
        </div>

        <div>
          <p className="text-slate-500">Phone</p>
          <p className="font-medium">{user?.phone || "—"}</p>
        </div>

        <div>
          <p className="text-slate-500">Location</p>
          <p className="font-medium">{user?.location || "—"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;