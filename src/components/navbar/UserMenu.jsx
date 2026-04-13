import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ isMobile = false, setMenuOpen }) => {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

  // Reset error whenever avatar URL changes (e.g. after upload or delete)
  useEffect(() => {
    setImgError(false);
  }, [user?.avatar]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
    if (isMobile && setMenuOpen) setMenuOpen(false);
  };

  if (!user) {
    return (
      <Link
        to="/login"
        onClick={() => isMobile && setMenuOpen(false)}
        className="bg-brand text-white px-4 py-2 rounded-lg text-center"
      >
        Login
      </Link>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <Link
          to="/profile"
          onClick={() => setMenuOpen(false)}
          className="border px-4 py-2 rounded-lg text-center"
        >
          Profile
        </Link>
        {user?.role === "owner" && (
          <Link
            to="/owner/dashboard"
            onClick={() => setMenuOpen(false)}
            className="border px-4 py-2 rounded-lg text-center"
          >
            Dashboard
          </Link>
        )}
        <button onClick={handleLogout} className="border px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>
    );
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-semibold overflow-hidden"
      >
        {user?.avatar && !imgError ? (
          <img
            src={user.avatar}
            alt="profile"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-white font-bold text-base leading-none">
            {firstLetter}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-card border rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground capitalize">
              {user.role}
            </p>
          </div>
          <Link to="/profile" className="px-4 py-2 hover:bg-muted">
            Profile
          </Link>
          {user.role === "owner" && (
            <Link to="/owner/dashboard" className="px-4 py-2 hover:bg-muted">
              Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-left text-red-500 hover:bg-muted"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;