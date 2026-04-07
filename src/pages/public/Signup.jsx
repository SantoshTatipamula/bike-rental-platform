import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState("customer");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedForm = {
      name: form.name.trim(),
      email: form.email.toLowerCase().trim(),
      phone: form.phone.trim(),
      password: form.password.trim(),
      location: form.location.trim(),
      avatar: form.avatar.trim(),
      role: activeTab, // 🔥 role from tab
    };

    if (
      !cleanedForm.name ||
      !cleanedForm.email ||
      !cleanedForm.phone ||
      !cleanedForm.password ||
      !cleanedForm.location
    ) {
      return setMessage("Please fill all required fields");
    }

    if (!isValidPassword(cleanedForm.password)) {
      return setMessage(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol"
      );
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      const newUser = registerUser(cleanedForm);

      if (!newUser) {
        setMessage("Email already exists");
        setLoading(false);
        return;
      }

      login(newUser);

      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md my-8">
        
        {/* 🔥 Tabs */}
        <div className="flex rounded-t-2xl overflow-hidden border">
          <button
            onClick={() => setActiveTab("customer")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "customer"
                ? "bg-white text-brand border-b-2 border-brand"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            CUSTOMER SIGNUP
          </button>

          <button
            onClick={() => setActiveTab("owner")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "owner"
                ? "bg-white text-brand border-b-2 border-brand"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            OWNER SIGNUP
          </button>
        </div>

        {/* 🔥 Card */}
        <div className="bg-white p-6 sm:p-8 rounded-b-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Full Name *"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email *"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Phone *"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password *"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <input
              placeholder="Location *"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <input
              placeholder="Avatar URL (optional)"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, avatar: e.target.value })
              }
            />

            {message && (
              <p className="text-sm text-center text-red-500">
                {message}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full bg-brand text-white py-3 rounded-lg hover:bg-brandDark transition"
            >
              {loading ? "Processing..." : "Signup"}
            </button>
          </form>

          {/* 🔥 Google UI */}
          <button
            type="button"
            className="w-full mt-4 border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-brand cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}