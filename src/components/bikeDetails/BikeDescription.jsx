const BikeDescription = ({ bike }) => {
  const specs = [
    { label: "Engine", value: bike.engine },
    { label: "Mileage", value: bike.mileage },
    { label: "Fuel Type", value: bike.fuel },
    { label: "Transmission", value: bike.transmission },
    { label: "Seating", value: bike.seating },
    { label: "Condition", value: bike.condition },
  ].filter((spec) => spec.value); // ✅ only show filled data

  if (!bike) return null;

  return (
    <div className="mt-10 bg-[#f1f5f9] rounded-2xl p-6 md:p-8">
      {/* 🧾 Description */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-[#020617] mb-3">
          About this bike
        </h2>

        <p className="text-[#64748b] leading-relaxed">
          {bike.description || "No description available for this bike."}
        </p>
      </div>

      {/* ⚙️ Specifications */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-[#020617] mb-4">
          Specifications
        </h3>

        <div>
          {specs.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {specs.map((spec, index) => (
                <Spec key={index} label={spec.label} value={spec.value} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No specifications provided</p>
          )}
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
