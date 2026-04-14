import { useAuth } from "@/context/AuthContext";

const ProfileInfo = () => {
  const { user } = useAuth();
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow sm:col-span-2">
      <h3 className="font-semibold mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
        {[
          ["Full Name", user?.name],
          ["Email", user?.email],
          ["Phone", user?.phone],
          ["Location", user?.location],
          ["Role", user?.role],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-slate-500 text-xs mb-0.5">{label}</p>
            <p className="font-medium truncate">{value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
