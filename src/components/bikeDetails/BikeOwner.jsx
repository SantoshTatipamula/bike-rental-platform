import { Phone, User } from "lucide-react";

const BikeOwner = ({ bike }) => {
  if (!bike) return null;

  const owner = bike.owner || {
    name: "John Doe",
    phone: "9876543210",
    joined: "Jan 2024",
    rating: 4.7,
  };

  return (
    <div className="mt-10 bg-[#f1f5f9] rounded-2xl p-6 md:p-8">

      <h2 className="text-xl md:text-2xl font-semibold text-[#020617] mb-6">
        Bike Owner
      </h2>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* 👤 Left Side */}
        <div className="flex items-center gap-4">
          
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="text-orange-500" />
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#020617]">
              {owner.name}
            </h3>

            <p className="text-sm text-[#64748b]">
              Joined {owner.joined}
            </p>

            <p className="text-sm text-[#64748b]">
              ⭐ {owner.rating} rating
            </p>
          </div>
        </div>

        {/* 📞 Right Side */}
        <div className="flex gap-3 w-full md:w-auto">

          <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full md:w-auto">
            <Phone size={16} />
            Contact
          </button>

          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full md:w-auto">
            View Profile
          </button>

        </div>

      </div>
    </div>
  );
};

export default BikeOwner;