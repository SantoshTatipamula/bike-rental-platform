import { Link } from "react-router-dom";
import {Bike} from "lucide-react"

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-xl font-bold text-brand tracking-tight flex items-center justify-center sm:justify-start gap-2"
    ><Bike className="text-orange-500" />
      BikeR
    </Link>
  );
};

export default Logo;