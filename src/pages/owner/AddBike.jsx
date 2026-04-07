import BikeForm from "@/components/owner/bikes/BikeForm";

const AddBike = () => {
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
        <BikeForm />

      </div>
    </div>
  );
};

export default AddBike;