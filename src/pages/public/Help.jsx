import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Bike, CreditCard, User, Shield, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Booking", icon: Bike },
  { label: "Payments", icon: CreditCard },
  { label: "Account", icon: User },
  { label: "Safety", icon: Shield },
];

const faqs = [
  {
    category: "Booking",
    q: "How do I book a bike?",
    a: "Go to the Bikes page, choose a bike that fits your needs, and click on \"Book Now\". Select your preferred time and duration, then confirm your request.",
  },
  {
    category: "Booking",
    q: "Can I cancel a booking?",
    a: "Currently you can contact the owner via the notification system to request a cancellation. We're building a self-service cancellation feature — it'll be available soon.",
  },
  {
    category: "Booking",
    q: "What happens after I confirm a booking?",
    a: "The owner receives a notification and can accept or reject your request. You'll get a notification when they respond. Once accepted, you can pick up the bike at the agreed time.",
  },
  {
    category: "Booking",
    q: "Why is the 'Book Now' button disabled?",
    a: "The bike may be marked as unavailable by the owner, or it's a demo bike. Look for bikes showing the green 'Available' badge.",
  },
  {
    category: "Payments",
    q: "How do I pay for my booking?",
    a: "Payment is made directly to the owner at the time of pickup. We currently support cash on pickup. Online payment integration is coming soon.",
  },
  {
    category: "Payments",
    q: "How is the price calculated?",
    a: "Price = hourly rate × number of hours. You can see the exact total on the booking confirmation screen before you submit.",
  },
  {
    category: "Account",
    q: "How do I update my profile?",
    a: "Go to your Profile page and click 'Edit Profile'. You can update your name, phone, location, and profile photo.",
  },
  {
    category: "Account",
    q: "How do I become an owner?",
    a: "Click 'Become Owner' in the navigation menu. Fill in the form with your details and bike information. Once submitted, your account is upgraded to owner status immediately.",
  },
  {
    category: "Account",
    q: "Can I use the same email for customer and owner?",
    a: "No. Each email is tied to one role (customer or owner). Choose your role carefully when signing up. If you need to switch, contact our support team.",
  },
  {
    category: "Safety",
    q: "Are the bikes insured?",
    a: "Bike owners are responsible for their own vehicle insurance. We recommend confirming with the owner before pickup. Always wear a helmet and ride safely.",
  },
  {
    category: "Safety",
    q: "What if the bike breaks down during my ride?",
    a: "Contact the owner immediately via the booking details. In an emergency, call our support number at +91 98765 43210.",
  },
];

const AccordionItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-gray-50 transition">
        <span className="font-medium text-slate-800 text-sm sm:text-base pr-4">{q}</span>
        <ChevronDown size={18} className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-gray-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Help() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = faqs.filter(f => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-orange-50 py-14 sm:py-20 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Help Center
        </motion.h1>
        <p className="text-slate-500 mb-8 text-sm sm:text-base">Search for answers and get help with bookings, payments, and account-related queries.</p>

        {/* Search */}
        <div className="max-w-lg mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your question..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30 text-sm" />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["All", ...categories.map(c => c.label)].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeCategory === cat ? "bg-brand text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          {filtered.length === 0 ? (
            <div className="text-center py-14 text-slate-400">
              <MessageCircle size={40} className="mx-auto mb-3 opacity-40" />
              <p>No results found. Try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((f, i) => <AccordionItem key={i} q={f.q} a={f.a} />)}
            </div>
          )}

          {/* Still need help */}
          <div className="mt-12 text-center bg-orange-50 rounded-2xl p-8">
            <h3 className="font-semibold text-slate-800 mb-2">Still need help?</h3>
            <p className="text-sm text-slate-500 mb-5">Our support team usually replies within a few hours.</p>
            <button onClick={() => navigate("/contact")}
              className="bg-brand hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
