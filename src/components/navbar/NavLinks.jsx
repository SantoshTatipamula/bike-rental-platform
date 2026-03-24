import { NavLink } from "react-router-dom";

const NavLinks = ({ user, isMobile = false, setMenuOpen }) => {
  const linkClass = ({ isActive }) =>
  `relative transition-colors duration-200 ${
    isActive ? "text-brand" : "hover:text-brand"
  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-brand after:origin-left after:transition-transform after:duration-300 ${
    isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
  }`;

  const handleClick = () => {
    if (isMobile && setMenuOpen) setMenuOpen(false);
  };

  if (user?.role === "customer") {
    return (
      <>
        <NavLink to="/" onClick={handleClick} className={linkClass}>Home</NavLink>
        <NavLink to="/bikes" onClick={handleClick} className={linkClass}>Bikes</NavLink>
        <NavLink to="/owner" onClick={handleClick} className={linkClass}>Become Owner</NavLink>
      </>
    );
  }

  if (user?.role === "owner") {
    return (
      <>
        <NavLink to="/dashboard" onClick={handleClick} className={linkClass}>Dashboard</NavLink>
        <NavLink to="/add-bike" onClick={handleClick} className={linkClass}>Add Bike</NavLink>
        <NavLink to="/my-bikes" onClick={handleClick} className={linkClass}>My Bikes</NavLink>
      </>
    );
  }

  if (user?.role === "admin") {
    return (
      <>
        <NavLink to="/admin" onClick={handleClick} className={linkClass}>Admin Panel</NavLink>
        <NavLink to="/users" onClick={handleClick} className={linkClass}>Users</NavLink>
        <NavLink to="/manage-bikes" onClick={handleClick} className={linkClass}>Manage Bikes</NavLink>
      </>
    );
  }

  return null;
};

export default NavLinks;