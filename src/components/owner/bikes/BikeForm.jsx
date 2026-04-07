import ImageUpload from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BikeForm = () => {
  return (
    <div className="bg-card rounded-2xl shadow-sm p-6 space-y-8">

      {/* Basic Info */}
      <section>
        <h2 className="font-semibold mb-4">Basic Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input placeholder="Bike Name" />
          <Input placeholder="Bike Type" />
        </div>

        <div className="mt-4">
          <Textarea placeholder="Description..." />
        </div>
      </section>

      {/* Pricing */}
      <section>
        <h2 className="font-semibold mb-4">Pricing</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input type="number" placeholder="Price per hour (₹)" />
          <Input type="number" placeholder="Price per day (₹)" />
        </div>
      </section>

      {/* Location */}
      <section>
        <h2 className="font-semibold mb-4">Location</h2>
        <Input placeholder="Pickup location" />
      </section>

      {/* Image Upload */}
      <ImageUpload />

      {/* Availability */}
      <section>
        <h2 className="font-semibold mb-4">Availability</h2>

        <select className="w-full border rounded-lg p-2">
          <option>Available</option>
          <option>Not Available</option>
        </select>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <Button className="bg-brand hover:bg-brandDark text-white px-6">
          Add Bike
        </Button>
      </div>

    </div>
  );
};

export default BikeForm;