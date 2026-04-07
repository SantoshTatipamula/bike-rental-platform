const BikeDescription = ({ bike }) => {
  if (!bike) return null;

  return (
    <div className="mt-10 bg-[#f1f5f9] rounded-2xl p-6 md:p-8">

      {/* 🧾 Description */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-[#020617] mb-3">
          About this bike
        </h2>

        <p className="text-[#64748b] leading-relaxed">
          {bike.description ||
            "Experience smooth rides with this well-maintained bike. Perfect for city travel and short trips. Comfortable seating, great mileage, and reliable performance make it an ideal choice for daily rentals."}
        </p>
      </div>

      {/* ⚙️ Specifications */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-[#020617] mb-4">
          Specifications
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <Spec label="Engine" value={bike.engine || "350cc"} />
          <Spec label="Mileage" value={bike.mileage || "35 km/l"} />
          <Spec label="Fuel Type" value={bike.fuel || "Petrol"} />
          <Spec label="Transmission" value={bike.transmission || "Manual"} />
          <Spec label="Seating" value={bike.seating || "2 Persons"} />
          <Spec label="Condition" value={bike.condition || "Excellent"} />

        </div>
      </div>
    </div>
  );
};

const Spec = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-sm text-[#64748b]">{label}</p>
    <p className="text-[#020617] font-medium">{value}</p>
  </div>
);

export default BikeDescription;