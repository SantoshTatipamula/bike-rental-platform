import { Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BikeOwner = ({ bike }) => {
  const navigate = useNavigate();
  if (!bike) return null;

  const owner = {
    name: bike.ownerName || "Unknown Owner",
    phone: bike.ownerPhone || "Not Available",
    joined: "Jan 2024",
    rating: bike.ownerRating || 4.5,
  };

  return (
    <div className="mt-10 bg-[#f1f5f9] rounded-2xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold text-[#020617] mb-6">
        Bike Owner
      </h2>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="text-orange-500" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#020617]">
              {owner.name}
            </h3>

            <p className="text-sm text-[#64748b]">Joined {owner.joined}</p>

            <p className="text-sm text-[#64748b]">⭐ {owner.rating} rating</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <a
            href={`tel:${owner.phone}`}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            <Phone size={16} />
            Call Owner
          </a>

          <a
            href={`https://wa.me/91${owner.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            💬 WhatsApp
          </a>

          <button
            onClick={() => navigate(`/profile/${bike.ownerId}`)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full md:w-auto"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeOwner;
