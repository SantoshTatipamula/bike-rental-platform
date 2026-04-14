import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BikeForm = ({ onSubmit }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", brand: "", type: "", description: "",
    price: "", pricePerDay: "", location: "",
    availability: "available", images: [],
    engine: "", mileage: "", fuel: "",
    transmission: "", seating: "", condition: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.location) {
      setError("Please fill required fields: name, price and location.");
      return;
    }
    if (uploading) { setError("Please wait... image is still uploading."); return; }
    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-sm p-4 sm:p-6 space-y-6 sm:space-y-8">

      <section>
        <h2 className="font-semibold mb-4 text-sm sm:text-base">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input name="name" placeholder="Bike Name *" onChange={handleChange} />
          <Input name="brand" placeholder="Brand (e.g. Yamaha, KTM)" onChange={handleChange} />
          <Input name="type" placeholder="Type (e.g. Cruiser, Sports, Scooter)" onChange={handleChange} className="sm:col-span-2" />
        </div>
        <div className="mt-3 sm:mt-4">
          <Textarea name="description" placeholder="Description..." onChange={handleChange} />
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-4 text-sm sm:text-base">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input name="price" type="number" placeholder="Price per hour (₹) *" onChange={handleChange} />
          <Input name="pricePerDay" type="number" placeholder="Price per day (₹)" onChange={handleChange} />
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-4 text-sm sm:text-base">Location</h2>
        <Input name="location" placeholder="Pickup location *" onChange={handleChange} />
      </section>

      <section>
        <h2 className="font-semibold mb-4 text-sm sm:text-base">Specifications</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input name="engine" placeholder="Engine (e.g. 155cc)" onChange={handleChange} />
          <Input name="mileage" placeholder="Mileage (km/l)" onChange={handleChange} />
          <Input name="fuel" placeholder="Fuel (Petrol/Electric)" onChange={handleChange} />
          <Input name="transmission" placeholder="Transmission" onChange={handleChange} />
          <Input name="seating" placeholder="Seating (e.g. 2)" onChange={handleChange} />
          <Input name="condition" placeholder="Condition" onChange={handleChange} />
        </div>
      </section>

      <ImageUpload setForm={setForm} setUploading={setUploading} />

      <section>
        <h2 className="font-semibold mb-4 text-sm sm:text-base">Availability</h2>
        <select name="availability" onChange={handleChange}
          className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30">
          <option value="available">Available</option>
          <option value="not_available">Not Available</option>
        </select>
      </section>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" className="bg-brand hover:bg-brandDark text-white px-6">
          Add Bike
        </Button>
      </div>
    </form>
  );
};

export default BikeForm;
