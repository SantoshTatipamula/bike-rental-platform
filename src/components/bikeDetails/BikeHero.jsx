import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const BikeHero = ({ bike }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!bike) return null;

  const isAvailable = !!bike.availability;
  const isDemoBike = bike?.ownerId === "demo-owner";

  const handleBookNow = () => {
    if (isDemoBike) { alert("This is a demo bike. Booking is disabled."); return; }
    if (!user) {
      localStorage.setItem("redirectAfterLogin", `/booking/${bike.id}`);
      navigate("/login");
      return;
    }
    navigate(`/booking/${bike.id}`);
  };

  return (
    <section className="bg-[#f8fafc] py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Image gallery */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <img
              src={bike.images?.[0]}
              alt={bike.name}
              className="col-span-2 rounded-2xl object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
            />
            <img src={bike.images?.[1]} alt="bike"
              className="rounded-xl object-cover w-full h-[100px] md:h-[140px]" />
            <img src={bike.images?.[2]} alt="bike"
              className="rounded-xl object-cover w-full h-[100px] md:h-[140px]" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#020617]">{bike.name}</h1>
              <p className="text-[#64748b] mt-2 text-sm sm:text-base">
                <strong>Type: </strong>{bike.type} | <strong>Brand: </strong>{bike.brand || "N/A"}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="font-medium">{bike.rating || 3.2}</span>
                <span className="text-gray-500 text-sm">(120 reviews)</span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-gray-600">
                <MapPin size={18} />
                <span>{bike.location}</span>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Price</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#f97316]">
                    ₹{bike.pricePerHour} / hr
                  </p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
              <button
                onClick={handleBookNow}
                disabled={!bike.availability || isDemoBike}
                className={`mt-4 w-full py-3 rounded-xl font-semibold transition text-sm sm:text-base ${
                  bike.availability && !isDemoBike
                    ? "bg-[#f97316] hover:bg-[#ea580c] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isDemoBike ? "Demo Bike (Booking Disabled)" : bike.availability ? "Book Now" : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BikeHero;
