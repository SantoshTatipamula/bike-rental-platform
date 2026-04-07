import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [activeTab, setActiveTab] = useState("customer");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 prevent logged-in users
  useEffect(() => {
    if (user) {
      const redirectPath = localStorage.getItem("redirectAfterLogin");

      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      }
       else {
  if (user.role === "owner") {
    navigate("/owner/dashboard");
  } else {
    navigate("/");
  }
}
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setMessage("Please fill all fields");
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      const userData = loginUser(
        form.email.toLowerCase().trim(),
        form.password
      );

      if (!userData) {
        setMessage("Invalid credentials");
        setLoading(false);
        return;
      }

      // 🔥 optional role check
      if (userData.role !== activeTab) {
        setMessage(`This account is not registered as ${activeTab}`);
        setLoading(false);
        return;
      }

      login(userData);

      const redirectPath = localStorage.getItem("redirectAfterLogin");

      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        navigate("/");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        
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
            CUSTOMER LOGIN
          </button>

          <button
            onClick={() => setActiveTab("owner")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "owner"
                ? "bg-white text-brand border-b-2 border-brand"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            OWNER LOGIN
          </button>
        </div>

        {/* 🔥 Card */}
        <div className="bg-white p-6 sm:p-8 rounded-b-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
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
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          {/* 🔥 Google Button (UI only) */}
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
            Don't have an account?{" "}
            <span
              className="text-brand cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}