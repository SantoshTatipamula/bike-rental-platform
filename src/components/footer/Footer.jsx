import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "@/components/navbar/Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12
        grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="text-sm mt-4 text-gray-400 max-w-xs">
            Rent bikes easily in your city. Fast, affordable, and reliable.
          </p>
          <div className="flex gap-4 mt-4">
            <Facebook size={18} className="hover:text-orange-400 cursor-pointer transition" />
            <Instagram size={18} className="hover:text-orange-400 cursor-pointer transition" />
            <Twitter size={18} className="hover:text-orange-400 cursor-pointer transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["About Us", "/about"],
              ["Contact Us", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-orange-400 transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Support</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["Help Center", "/help"],
              ["FAQs", "/faq"],
              ["Terms & Conditions", "/terms"],
              ["Privacy Policy", "/privacy"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-orange-400 transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin size={15} className="flex-shrink-0" /> Karimnagar, Telangana</li>
            <li className="flex items-center gap-2"><Phone size={15} className="flex-shrink-0" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={15} className="flex-shrink-0" /> support@biker.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mx-4 sm:mx-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} BikeR. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-orange-400 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-orange-400 transition">Terms</Link>
          <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
