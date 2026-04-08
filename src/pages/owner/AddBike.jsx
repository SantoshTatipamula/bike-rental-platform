import { addBike } from "@/services/bikeService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BikeForm from "@/components/owner/bikes/BikeForm";


const AddBike = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddBike = async (formData) => {
  try {
    if(!user){
      alert("Please login First");
      return
    }
    await addBike({
  ...formData,
  ownerId: user.id,
  ownerName: user?.name || "Owner",
  ownerPhone: user?.phone || "Not Available",
  ownerRating: user?.rating || 4.5,
});

    // 🔥 redirect to bikes page
    navigate("/bikes");

  } catch (error) {
    console.error("Error adding bike:", error);
  }
};
  return (
    <div className="bg-background min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textPrimary">
            Add New Bike
          </h1>
          <p className="text-textSecondary">
            Fill in details to list your bike
          </p>
        </div>

        {/* Form */}
        <BikeForm onSubmit={handleAddBike} />

      </div>
    </div>
  );
};

export default AddBike;