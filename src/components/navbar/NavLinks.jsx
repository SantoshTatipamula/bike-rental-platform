import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const NavLinks = ({ isMobile = false, setMenuOpen }) => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `relative transition-colors duration-200 ${
      isActive ? "text-brand" : "hover:text-brand"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-brand after:origin-left after:transition-transform after:duration-300 ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  const handleClick = () => {
    if (isMobile && setMenuOpen) setMenuOpen(false);
  };

  // 🟢 NOT LOGGED IN or CUSTOMER (same UI)
  if (!user || user.role === "customer") {
    return (
      <>
        <NavLink to="/" onClick={handleClick} className={linkClass}>Home</NavLink>
        <NavLink to="/bikes" onClick={handleClick} className={linkClass}>Bikes</NavLink>
        <NavLink to="/become-owner" onClick={handleClick} className={linkClass}>Become Owner</NavLink>
      </>
    );
  }

  // 🟢 OWNER
  if (user.role === "owner") {
    return (
      <>
        <NavLink to="/" onClick={handleClick} className={linkClass}>Home</NavLink>
        <NavLink to="/bikes" onClick={handleClick} className={linkClass}>Bikes</NavLink>
        {/* <NavLink to="/owner/dashboard" onClick={handleClick} className={linkClass}>Dashboard</NavLink> */}
        <NavLink to="/owner/add-bike" onClick={handleClick} className={linkClass}>Add Bike</NavLink>
      </>
    );
  }

  // 🟢 ADMIN (UI not ready, keep minimal)
  if (user.role === "admin") {
    return (
      <>
        <NavLink to="/" onClick={handleClick} className={linkClass}>Home</NavLink>
        <NavLink to="/admin/dashboard" onClick={handleClick} className={linkClass}>Admin</NavLink>
      </>
    );
  }

  return null;
};

export default NavLinks;