import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const BikeHero = ({ bike }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAvailable = bike.availability === "available";
  const handleBookNow = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/booking/${bike.id}`);

      navigate("/login");
      return;
    }
    navigate(`/booking/${bike.id}`);
  };
  if (!bike) return null;

  return (
    <section className="bg-[#f8fafc] py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:grid md:grid-cols-2 gap-10">
        {/* 🔹 LEFT: IMAGE GALLERY */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <img
            src={bike.images?.[0]}
            alt={bike.name}
            className="col-span-2 rounded-2xl object-cover w-full h-[220px] md:h-[300px]"
          />
          <img
            src={bike.images?.[1]}
            alt="bike"
            className="rounded-xl object-cover w-full h-[100px] md:h-[140px]"
          />
          <img
            src={bike.images?.[2]}
            alt="bike"
            className="rounded-xl object-cover w-full h-[100px] md:h-[140px]"
          />
        </div>

        {/* 🔹 RIGHT: DETAILS */}
        <div className="flex flex-col justify-between">
          {/* Top Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#020617]">
              {bike.name}
            </h1>

            <p className="text-[#64748b] mt-2">
              <strong>Type: </strong>
              {bike.type} | <strong>Brand: </strong>
              {bike.brand || "N/A"}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              <span className="font-medium">{bike.rating}</span>
              <span className="text-gray-500 text-sm">(120 reviews)</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <MapPin size={18} />
              <span>{bike.location}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Price</p>
                <p className="text-lg md:text-2xl font-bold text-[#f97316]">
                  ₹{bike.price} / day
                </p>
              </div>

              <span
                className={`text-sm px-3 py-1 rounded-full ${isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >
                {isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            <button
              onClick={handleBookNow}
              disabled={bike.availability !== "available"}
              className={`mt-4 w-full py-3 rounded-xl font-semibold transition ${
                bike.availability === "available"
                  ? "bg-[#f97316] hover:bg-[#ea580c] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {bike.availability === "available" ? "Book Now" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BikeHero;
