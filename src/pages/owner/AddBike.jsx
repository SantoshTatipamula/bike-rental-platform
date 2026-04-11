import { addBike } from "@/services/bikeService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BikeForm from "@/components/owner/bikes/BikeForm";


const AddBike = () => {


  const testUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "bike_rental_unsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dd5vh0k4m/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  console.log("Cloudinary Response:", data);
};




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
  type: formData.type,
  location: formData.location,

  pricePerHour: Number(formData.price), // 🔥 FIX
  pricePerDay: Number(formData.price) * 8,

  images: formData.images || [], // 🔥 FIX

  availability: true,

  ownerId: user.uid,
  ownerName: user?.name || "Owner",
  ownerPhone: user?.phone || "Not Available",
  ownerRating: user?.rating || 4.5,
});

    if (res.success) {
      console.log("Bike added successfully");
     
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