import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BikeForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    brand:"",
    type: "",
    description: "",
    price: "",
    pricePerDay: "",
    location: "",
    availability: "available",
    images: [],
    engine: "",
    mileage: "",
    fuel: "",
    transmission: "",
    seating: "",
    condition: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };


  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-sm p-6 space-y-8">

      <section>
        <h2 className="font-semibold mb-4">Basic Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input name="name" placeholder="Bike Name" onChange={handleChange} />
          <Input name="brand" placeholder="Brand (e.g. Yamaha, KTM)" onChange={handleChange} />
          <Input name="type" placeholder="Bike Type (e.g. Cruiser, Sports, Scooter)" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <Textarea name="description" placeholder="Description..." onChange={handleChange} />
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-4">Pricing</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input name="price" type="number" placeholder="Price per hour (₹)" onChange={handleChange} />
          <Input name="pricePerDay" type="number" placeholder="Price per day (₹)" onChange={handleChange} />
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-4">Location</h2>
        <Input name="location" placeholder="Pickup location" onChange={handleChange} />
      </section>

      <section>
  <h2 className="font-semibold mb-4">Specifications</h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

    <Input name="engine" placeholder="Engine (e.g. 155cc)" onChange={handleChange} />

    <Input name="mileage" placeholder="Mileage (e.g. 40 km/l)" onChange={handleChange} />

    <Input name="fuel" placeholder="Fuel Type (Petrol/Electric)" onChange={handleChange} />

    <Input name="transmission" placeholder="Transmission (Manual/Auto)" onChange={handleChange} />

    <Input name="seating" placeholder="Seating (e.g. 2 Persons)" onChange={handleChange} />

    <Input name="condition" placeholder="Condition (Good/Excellent)" onChange={handleChange} />

  </div>
</section>

      <ImageUpload setForm={setForm}/>

      <section>
        <h2 className="font-semibold mb-4">Availability</h2>

        <select
          name="availability"
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="available">Available</option>
          <option value="not_available">Not Available</option>
        </select>
      </section>

      <div className="flex justify-end">
        <Button type="submit" className="bg-brand hover:bg-brandDark text-white px-6">
          Add Bike
        </Button>
      </div>

    </form>
  );
};

export default BikeForm;