import { useEffect, useState } from "react";
import {
  getAllBikes,
  deleteBike,
  toggleAvailability,
} from "@/services/bikeService";
import { useAuth } from "@/context/AuthContext";

const OwnerBikes = () => {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);

  const loadBikes = async () => {
    const allBikes = await getAllBikes();


    // ✅ Only owner bikes
    const myBikes = allBikes.filter(
      (bike) => String(bike.ownerId) === String(user?.id)
    );
    
    setBikes(myBikes);
  };

  useEffect(() => {
    if (user) loadBikes();
  }, [user]);

  // 🗑️ Delete
  const handleDelete = async (id) => {
    await deleteBike(id);
    loadBikes();
  };

  // 🔄 Toggle Availability
  const handleToggle = async (id) => {
    await toggleAvailability(id);
    loadBikes();
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-textPrimary">
            My Bikes
          </h1>
          <p className="text-textSecondary">
            Manage your listed bikes
          </p>
        </div>

        {/* Empty State */}
        {bikes.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">No bikes added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4"
              >
                {/* Bike Info */}
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={bike.images?.[0] || "/fallback-bike.jpg"}
                    alt={bike.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {bike.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₹{bike.price}/hr
                    </p>
                    <p className="text-xs text-gray-400">
                      {bike.location}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">

                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(bike.id)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      bike.availability === "available"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {bike.availability === "available"
                      ? "Disable"
                      : "Enable"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(bike.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
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