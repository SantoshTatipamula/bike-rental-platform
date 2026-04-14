import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const inputClass = "w-full border p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30";

const OwnerForm = () => {
  const { user, updateUserContext } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", bikeType: "", location: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.bikeType || !form.location || !form.price) {
      setMessage("Please fill all fields");
      return;
    }
    if (!user) { setMessage("You must be logged in"); return; }
    try {
      setLoading(true);
      const updatedUser = { ...user, role: "owner", ownerInfo: { ...form } };
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { role: "owner", ownerInfo: { ...form } });
      updateUserContext(updatedUser);
      navigate("/owner/dashboard");
    } catch (error) {
      console.error("Error updating owner:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="owner-form" className="py-12 md:py-16 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              Apply to Become Owner
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Full Name *" value={form.name}
                onChange={handleChange} className={inputClass} />
              <input name="phone" type="tel" placeholder="Phone Number *" value={form.phone}
                onChange={handleChange} className={inputClass} />
              <select name="bikeType" value={form.bikeType} onChange={handleChange} className={inputClass}>
                <option value="">Select Bike Type</option>
                <option value="scooter">Scooter</option>
                <option value="sports">Sports</option>
                <option value="cruiser">Cruiser</option>
                <option value="electric">Electric</option>
              </select>
              <select name="location" value={form.location} onChange={handleChange} className={inputClass}>
                <option value="">Select Location</option>
                <option value="Housing Board">Housing Board</option>
                <option value="Kothirampur">Kothirampur</option>
                <option value="Mankammathota">Mankammathota</option>
                <option value="Jagtial Road">Jagtial Road</option>
              </select>
              <input name="price" type="number" placeholder="Expected Price per Hour (₹)" value={form.price}
                onChange={handleChange} className={inputClass} />

              {message && <p className="text-sm text-center text-red-500">{message}</p>}

              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-60">
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OwnerForm;
