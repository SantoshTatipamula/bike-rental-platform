import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using BikeR ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Platform. We reserve the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the new terms.`,
  },
  {
    title: "2. User Accounts",
    content: `You must be at least 18 years old and hold a valid driving licence to use BikeR as a rider. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration.`,
  },
  {
    title: "3. Booking and Rental",
    content: `All bookings are subject to owner approval. Once a booking is approved, the rider is expected to pick up the bike at the agreed time. Cancellations must be communicated to the owner directly. BikeR acts as a marketplace and is not a party to the rental agreement between owners and riders.`,
  },
  {
    title: "4. Payment Terms",
    content: `Payment for rentals is made directly between the rider and the owner. BikeR does not process payments on behalf of either party at this time. Rental prices shown on the Platform are set by owners and are inclusive of any applicable fees unless otherwise stated.`,
  },
  {
    title: "5. Responsibilities of Riders",
    content: `Riders are responsible for riding safely and in accordance with all applicable traffic laws. You must have a valid driving licence for the vehicle type being rented. You are responsible for any traffic fines, penalties, or damages incurred during your rental period. Return the bike in the same condition as received.`,
  },
  {
    title: "6. Responsibilities of Owners",
    content: `Owners must ensure their bikes are roadworthy, insured, and compliant with all applicable laws before listing them on the Platform. Owners must accurately describe the condition, availability, and specifications of their bikes. BikeR is not liable for any disputes arising from inaccurate listings.`,
  },
  {
    title: "7. Prohibited Activities",
    content: `You may not use the Platform for any unlawful purpose, to transmit harmful or malicious content, to impersonate another user, or to interfere with the Platform's operation. Bikes may not be used for racing, off-road riding, or any activities outside the agreed rental scope.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `BikeR provides the Platform "as is" and makes no warranties regarding the quality, safety, or condition of bikes listed. We are not liable for any personal injury, property damage, loss, or other damages arising from the use of the Platform or rentals facilitated through it.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Karimnagar, Telangana.`,
  },
  {
    title: "10. Contact",
    content: `For questions about these Terms, please contact us at support@biker.com.`,
  },
];

export default function Terms() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-slate-900 py-14 sm:py-20 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Terms & Conditions
        </motion.h1>
        <p className="text-slate-400 text-sm sm:text-base">Last updated: April 2026</p>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 p-4 bg-orange-50 rounded-xl border-l-4 border-brand">
            These Terms and Conditions define how you can use the BikeR platform. By using our services, you agree to follow these guidelines as both a rider and a bike owner.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{section.content}</p>
                {i < sections.length - 1 && <div className="border-b border-gray-100 mt-8" />}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/privacy")}
              className="border border-brand text-brand hover:bg-orange-50 px-6 py-2.5 rounded-xl font-medium transition text-sm">
              Read Privacy Policy
            </button>
            <button onClick={() => navigate("/contact")}
              className="bg-brand hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition text-sm">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
