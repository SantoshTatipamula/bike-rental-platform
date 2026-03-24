import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-xl font-bold text-brand tracking-tight"
    >
      BikeRent
    </Link>
  );
};

export default Logo;