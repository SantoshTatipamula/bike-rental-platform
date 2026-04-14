import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../bookings/StatusBadge";

const UserAvatar = ({ avatar, name }) => {
  const [imgError, setImgError] = useState(false);
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";
  if (avatar && !imgError) {
    return <img src={avatar} alt={name}
      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      onError={() => setImgError(true)} />;
  }
  return (
    <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{firstLetter}</span>
    </div>
  );
};

const RecentRequests = ({ requests = [] }) => {
  const navigate = useNavigate();
  const safeRequests = Array.isArray(requests) ? requests : [];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
      <h3 className="font-semibold text-base sm:text-lg mb-4">Recent Requests</h3>
      {!safeRequests.length ? (
        <p className="text-sm text-gray-500">No requests yet</p>
      ) : (
        <div className="space-y-3">
          {safeRequests.slice(0, 5).map((b) => (
            <div key={b.id}
              className="flex justify-between items-center border p-3 rounded-lg gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar avatar={b.userAvatar} name={b.userName} />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{b.userName || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{b.bikeName} • {b.hours} hrs</p>
                </div>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      )}
      <div className="text-right mt-4">
        <button onClick={() => navigate("/owner/bookings")}
          className="text-sm text-orange-500 hover:underline">
          View All Requests →
        </button>
      </div>
    </div>
  );
};

export default RecentRequests;
