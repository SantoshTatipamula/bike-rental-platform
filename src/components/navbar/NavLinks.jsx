import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const NavLinks = ({ isMobile = false, setMenuOpen }) => {
  const { user } = useAuth();

  const desktopClass = ({ isActive }) =>
    `relative transition-colors duration-200 text-sm font-medium ${
      isActive ? "text-brand" : "hover:text-brand"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-brand after:origin-left after:transition-transform after:duration-300 ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  const mobileClass = ({ isActive }) =>
    `block py-2.5 px-2 rounded-lg text-base font-medium transition-colors ${
      isActive ? "text-brand bg-orange-50" : "text-gray-700 hover:text-brand hover:bg-gray-50"
    }`;

  const linkClass = isMobile ? mobileClass : desktopClass;

  const handleClick = () => {
    if (isMobile && setMenuOpen) setMenuOpen(false);
  };

  if (!user || user.role === "customer") {
    return (
      <>
        <NavLink to="/" onClick={handleClick} className={linkClass}>Home</NavLink>
        <NavLink to="/bikes" onClick={handleClick} className={linkClass}>Bikes</NavLink>
        <NavLink to="/become-owner" onClick={handleClick} className={linkClass}>Become Owner</NavLink>
        {user && (
          <NavLink to="/customer/bookings" onClick={handleClick} className={linkClass}>My Bookings</NavLink>
        )}
      </>
    );
  }

  if (user.role === "owner") {
    return (
      <>
        <NavLink to="/" onClick={handleClick} className={linkClass}>Home</NavLink>
        <NavLink to="/bikes" onClick={handleClick} className={linkClass}>Bikes</NavLink>
        <NavLink to="/owner/add-bike" onClick={handleClick} className={linkClass}>Add Bike</NavLink>
        <NavLink to="/owner/my-bikes" onClick={handleClick} className={linkClass}>My Bikes</NavLink>
        <NavLink to="/owner/bookings" onClick={handleClick} className={linkClass}>Bookings</NavLink>
      </>
    );
  }

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
