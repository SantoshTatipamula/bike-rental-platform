import { useEffect, useState } from "react";
import { getAllBikes, deleteBike, toggleAvailability } from "@/services/bikeService";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";

const OwnerBikes = () => {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBikes = async () => {
    const allBikes = await getAllBikes();
    const myBikes = allBikes.filter((bike) => String(bike.ownerId) === String(user?.uid));
    setBikes(myBikes);
    setLoading(false);
  };

  useEffect(() => { if (user) loadBikes(); }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike?")) return;
    await deleteBike(id);
    loadBikes();
  };

  const handleToggle = async (id) => {
    await toggleAvailability(id);
    loadBikes();
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-background min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-textPrimary">My Bikes</h1>
          <p className="text-textSecondary text-sm mt-1">Manage your listed bikes</p>
        </div>

        {bikes.length === 0 ? (
          <EmptyState message="No bikes added yet" />
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {bikes.map((bike) => (
              <div key={bike.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Bike Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
                  <img
                    src={bike.images?.[0] || "/fallback-bike.jpg"}
                    alt={bike.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{bike.name}</h3>
                    <p className="text-sm text-gray-500">₹{bike.pricePerHour}/hr</p>
                    <p className="text-xs text-gray-400">{bike.location}</p>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                      bike.availability ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                    }`}>
                      {bike.availability ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleToggle(bike.id)}
                    className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium ${
                      bike.availability ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
                    } transition`}
                  >
                    {bike.availability ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => handleDelete(bike.id)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBikes;
