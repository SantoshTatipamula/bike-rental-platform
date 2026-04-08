import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

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
  const handleSubmit = (e) => {
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

    const updatedUser = {
      ...user,
      role: "owner",
      ownerInfo: {
        ...form,
      },
    };

    updateUser(updatedUser);
    updateUserContext(updatedUser);

    alert("You are now a bike owner!");

    navigate("/owner/dashboard");
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
              onChange={handleChange}
              className="border p-3 rounded-md"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="border p-3 rounded-md"
            />

            <input
              name="bikeType"
              placeholder="Bike Type (e.g., Activa, Royal Enfield)"
              onChange={handleChange}
              className="border p-3 rounded-md"
            />

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="border p-3 rounded-md"
            />

            <input
              name="price"
              placeholder="Price per Day"
              onChange={handleChange}
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