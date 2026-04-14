import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginEmail, user } = useAuth();
  const [activeTab, setActiveTab] = useState("customer");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        navigate(user?.role === "owner" ? "/owner/dashboard" : "/");
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setMessage("Please fill all fields");
    try {
      setLoading(true);
      setMessage("");
      await loginEmail(form.email.toLowerCase().trim(), form.password, activeTab);
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) { localStorage.removeItem("redirectAfterLogin"); navigate(redirectPath); }
      else navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") setMessage("Invalid email or password");
      else setMessage(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");
      await login(activeTab);
    } catch (error) {
      setMessage(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {/* Tabs */}
        <div className="flex rounded-t-2xl overflow-hidden border">
          {["customer", "owner"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-white text-brand border-b-2 border-brand"
                  : "bg-gray-100 text-gray-500"
              }`}>
              {tab.toUpperCase()} LOGIN
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white p-6 sm:p-8 rounded-b-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email"
              className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password"
              className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {message && <p className="text-sm text-center text-red-500">{message}</p>}
            <button disabled={loading}
              className="w-full bg-brand text-white py-3 rounded-lg hover:bg-brandDark transition font-medium disabled:opacity-60">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button type="button" onClick={handleGoogleLogin}
            className="w-full mt-4 border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <span className="text-brand cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
