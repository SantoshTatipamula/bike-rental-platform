import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Getting Started",
    faqs: [
      { q: "What is BikeR?", a: "BikeR is a peer-to-peer bike rental platform that connects local bike owners with riders. You can rent a bike by the hour directly from owners in your city." },
      { q: "Do I need an account to rent a bike?", a: "You can browse bikes without an account, but you'll need to sign up to make a booking." },
      { q: "Which cities is BikeR available in?", a: "We're currently active in Karimnagar and surrounding areas including Housing Board, Kothirampur, Mankammathota, and Jagtial Road. We're expanding soon!" },
    ],
  },
  {
    title: "For Riders",
    faqs: [
      { q: "How do I find a bike near me?", a: "Use the location selector in the top navigation bar to filter bikes by your area. The Bikes page will show all available bikes near you." },
      { q: "Can I book a bike in advance?", a: "Yes! You can select any future date and time when booking. The owner will confirm your request." },
      { q: "What documents do I need to ride?", a: "You'll need a valid driving licence for the type of vehicle you're renting. The owner may ask to verify it at pickup." },
      { q: "What if I return the bike late?", a: "Contact the owner directly to inform them. Late returns may incur additional charges at the owner's discretion." },
    ],
  },
  {
    title: "For Owners",
    faqs: [
      { q: "How do I list my bike?", a: "Sign up as an owner (or use the Become Owner flow if you're already a customer), then go to 'Add Bike' and fill in your bike's details and photos." },
      { q: "How do I get paid?", a: "Payment is collected from the rider at pickup. You keep the full rental amount. We're working on an in-app payment system for added security." },
      { q: "Can I temporarily disable my listing?", a: "Yes. Go to My Bikes and toggle the availability switch on any bike to mark it as unavailable. It won't appear in search results while disabled." },
      { q: "What if a rider damages my bike?", a: "We recommend agreeing on a security deposit with the rider before pickup. Always document the bike's condition before and after each rental." },
    ],
  },
  {
    title: "Account & Privacy",
    faqs: [
      { q: "How do I reset my password?", a: "On the Login page, you can use Google Sign-in to access your account. For email/password reset, use Firebase's 'Forgot Password' flow — contact us if you need help." },
      { q: "How is my personal data used?", a: "Your data is stored securely in Firebase and is used only to operate the platform. We never sell your data to third parties. See our Privacy Policy for full details." },
      { q: "Can I delete my account?", a: "Yes. Contact us at support@biker.com and we'll delete your account and data within 7 business days." },
    ],
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
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-gray-100 pt-3">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-orange-50 py-14 sm:py-20 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Frequently Asked Questions
        </motion.h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
          Find answers to commonly asked questions about using BikeR. If you still need help, feel free to contact our support team.
        </p>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.05 }}>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand rounded-full inline-block" />
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.faqs.map((f, fi) => <AccordionItem key={fi} q={f.q} a={f.a} />)}
              </div>
            </motion.div>
          ))}

          {/* Still have questions */}
          <div className="text-center bg-orange-50 rounded-2xl p-8 mt-8">
            <h3 className="font-semibold text-slate-800 mb-2">Didn't find your answer?</h3>
            <p className="text-sm text-slate-500 mb-5">Contact our support team — we respond within a few hours.</p>
            <button onClick={() => navigate("/contact")}
              className="bg-brand hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
