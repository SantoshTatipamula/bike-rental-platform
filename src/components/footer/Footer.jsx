import { Link } from "react-router-dom";
import {
  Bike,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

import Logo from "@/components/navbar/Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 ">
      {/* Main Grid */}
      <div
        className="max-w-7xl mx-auto px-6 py-12
                      grid gap-10
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-4
                      text-center sm:text-left"
      >
        {/* Brand */}
        <div>
          <Logo/>
          <p className="text-sm mt-4 text-gray-400">
            Rent bikes easily in your city. Fast, affordable, and reliable.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-4">
            <Facebook className="hover:text-orange-400 cursor-pointer" />
            <Instagram className="hover:text-orange-400 cursor-pointer" />
            <Twitter className="hover:text-orange-400 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/bikes" className="hover:text-orange-400">
                Bikes
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help" className="hover:text-orange-400">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-400">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-orange-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-orange-400">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin size={16} /> Karimnagar
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} /> support@bikerent.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mx-6"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 text-center sm:text-left">
        <p>© {new Date().getFullYear()} BikeRent. All rights reserved.</p>

        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-orange-400">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-orange-400">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
