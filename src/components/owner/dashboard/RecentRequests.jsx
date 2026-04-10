import { useNavigate } from "react-router-dom";
import StatusBadge from "../bookings/StatusBadge";

const RecentRequests = ({ requests = [] }) => {
  const navigate = useNavigate();

  const safeRequests = Array.isArray(requests) ? requests : [];

  if (!safeRequests.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">Recent Requests</h3>
        <p className="text-sm text-gray-500">No requests</p>
      </div>
    );
  }

  const recentRequests = safeRequests.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Recent Requests</h3>

      <div className="space-y-3">
        {recentRequests.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <img
                src={b.userAvatar || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-medium">{b.userName || "User"}</p>
                <p className="text-xs text-gray-500">
                  {b.bikeName} • {b.hours} hrs
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <StatusBadge status={b.status} />
          </div>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="text-right mt-4">
        <button
          onClick={() => navigate("/owner/bookings")}
          className="text-sm text-orange-500 hover:underline"
        >
          View All Requests →
        </button>
      </div>
    </div>
  );
};

export default RecentRequests;