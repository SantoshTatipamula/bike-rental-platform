import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [activeTab, setActiveTab] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", location: "", avatar: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isValidPassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const c = { name: form.name.trim(), email: form.email.toLowerCase().trim(), phone: form.phone.trim(), password: form.password.trim(), location: form.location.trim(), role: activeTab };
    if (!c.name || !c.email || !c.phone || !c.password || !c.location) return setMessage("Please fill all required fields");
    if (!/^[0-9]{10}$/.test(c.phone)) return setMessage("Enter a valid 10-digit phone number");
    if (!isValidPassword(c.password)) return setMessage("Password must be 8+ chars with uppercase, lowercase, number & symbol");
    try {
      setLoading(true); setMessage("");
      await signup(c.email, c.password, c.role);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") setMessage("Email already registered");
      else setMessage("Signup failed. Try again.");
    } finally { setLoading(false); }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true); setMessage("");
      await login(activeTab);
      navigate("/");
    } catch (error) {
      setMessage("Google signup failed");
    } finally { setLoading(false); }
  };

  const inputClass = "w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {/* Tabs */}
        <div className="flex rounded-t-2xl overflow-hidden border">
          {["customer", "owner"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition ${
                activeTab === tab ? "bg-white text-brand border-b-2 border-brand" : "bg-gray-100 text-gray-500"
              }`}>
              {tab.toUpperCase()} SIGNUP
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white p-6 sm:p-8 rounded-b-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name *" className={inputClass} onChange={handleChange("name")} />
            <input type="email" placeholder="Email *" className={inputClass} onChange={handleChange("email")} />
            <input placeholder="Phone * (10 digits)" className={inputClass} onChange={handleChange("phone")} />
            <input type="password" placeholder="Password *" className={inputClass} onChange={handleChange("password")} />
            <input placeholder="Location *" className={inputClass} onChange={handleChange("location")} />
            {message && <p className="text-sm text-center text-red-500">{message}</p>}
            <button disabled={loading}
              className="w-full bg-brand text-white py-3 rounded-lg hover:bg-brandDark transition font-medium disabled:opacity-60">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <button type="button" onClick={handleGoogleSignup}
            className="w-full mt-4 border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span className="text-brand cursor-pointer font-medium hover:underline" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
