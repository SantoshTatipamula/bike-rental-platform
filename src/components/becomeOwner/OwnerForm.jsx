import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const OwnerForm = () => {
  const { user, updateUserContext } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bikeType: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 MAIN FIX
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.name ||
    !form.phone ||
    !form.bikeType ||
    !form.location ||
    !form.price
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    const updatedUser = {
      ...user,
      role: "owner",
      ownerInfo: {
        ...form,
      },
    };

    // 🔥 Update Firestore
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      role: "owner",
      ownerInfo: {
        ...form,
      },
    });

    // 🔥 Update UI
    updateUserContext(updatedUser);

    alert("You are now a bike owner!");

    navigate("/owner/dashboard");
  } catch (error) {
    console.error("Error updating owner:", error);
  }
};

  return (
    <section id="owner-form" className="py-16 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto p-6 shadow-md rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Apply to Become Owner
          </h2>

          {/* 🔥 FIX: real form */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
  name="name"
  placeholder="Full Name"
  value={form.name}
  onChange={handleChange}
  required
  className="border p-3 rounded-md"
/>

<input
  name="phone"
  type="tel"
  placeholder="Phone Number"
  value={form.phone}
  onChange={handleChange}
  required
  className="border p-3 rounded-md"
/>

<select
  name="bikeType"
  value={form.bikeType}
  onChange={handleChange}
  required
  className="border p-3 rounded-md"
>
  <option value="">Select Bike Type</option>
  <option value="scooter">Scooter</option>
  <option value="sports">Sports</option>
  <option value="cruiser">Cruiser</option>
  <option value="electric">Electric</option>
</select>

<select
  name="location"
  value={form.location}
  onChange={handleChange}
  required
  className="border p-3 rounded-md"
>
  <option value="">Select Location</option>
  <option value="Housing Board">Housing Board</option>
  <option value="Kothirampur">Kothirampur</option>
  <option value="Mankammathota">Mankammathota</option>
  <option value="Jagtial Road">Jagtial Road</option>
</select>

<input
  name="price"
  type="number"
  placeholder="Price per Day"
  value={form.price}
  onChange={handleChange}
  required
  className="border p-3 rounded-md"
/>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md mt-4"
            >
              Submit Application
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default OwnerForm;