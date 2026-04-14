import { useState } from "react";
import { addBike } from "@/services/bikeService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BikeForm from "@/components/owner/bikes/BikeForm";

const AddBike = () => {
  const [resetForm, setResetForm] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddBike = async (formData) => {
    try {
      if (!user) {
        alert("Please login First");
        return;
      }

      const res = await addBike({
        name: formData.name,
        brand: formData.brand,
        type: formData.type,

        // 🔥 ADD THIS (IMPORTANT)
        description:
          formData.description?.trim() ||
          `${formData.brand || "This"} ${formData.name} is a well-maintained ${
            formData.type || "bike"
          } available for rent in ${formData.location}. Perfect for daily rides and long trips.`,

        location: formData.location,

        pricePerHour: Number(formData.price),
        pricePerDay: Number(formData.pricePerDay || formData.price * 8),

        images: formData.images || [],

        availability: formData.availability === "available",

        engine: formData.engine,
        mileage: formData.mileage,
        fuel: formData.fuel,
        transmission: formData.transmission,
        seating: formData.seating,
        condition: formData.condition,

        ownerId: user.uid,
        ownerName: user?.name || "Owner",
        ownerPhone: user?.phone || "Not Available",
        ownerRating: user?.rating || 4.5,
      });

      if (res.success) {
        alert("Bike added successfully");

        setResetForm(true);
        setTimeout(() => setResetForm(false), 100);

        navigate("/bikes");
      } else {
        alert("Failed to add bike");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-background min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textPrimary">Add New Bike</h1>
          <p className="text-textSecondary">
            Fill in details to list your bike
          </p>
        </div>

        {/* Form */}
        <BikeForm onSubmit={handleAddBike} resetForm={resetForm} />
      </div>
    </div>
  );
};

export default AddBike;
