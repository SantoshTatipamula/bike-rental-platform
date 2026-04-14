import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const highlights = [
  { icon: Lock, title: "Secure Storage", desc: "All data stored securely in Firebase with encryption at rest." },
  { icon: Eye, title: "No Data Selling", desc: "We never sell your personal data to advertisers or third parties." },
  { icon: UserCheck, title: "Your Control", desc: "You can request deletion of your data at any time." },
  { icon: Database, title: "Minimal Collection", desc: "We only collect what's necessary to run the platform." },
];

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Account information: your name, email address, phone number, and profile photo when you sign up.",
      "Booking data: details of bikes you've booked or listed, including dates, times, and prices.",
      "Device information: browser type, IP address, and approximate location for security purposes.",
      "Usage data: pages visited and interactions with the Platform to help us improve the service.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To create and manage your account on the Platform.",
      "To facilitate bookings between riders and owners.",
      "To send you notifications about your bookings and account activity.",
      "To improve the Platform's features and fix bugs.",
      "To comply with legal obligations and prevent fraudulent activity.",
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      "With other users: your name and profile photo are shared with owners when you make a booking, and with riders when you receive one.",
      "With Firebase / Google: our backend infrastructure is powered by Firebase, which processes data under Google's privacy policies.",
      "We do not sell, rent, or trade your personal data to any third parties for marketing purposes.",
    ],
  },
  {
    title: "4. Data Retention",
    content: [
      "We retain your account data for as long as your account is active.",
      "Booking records are retained for up to 2 years for legal and dispute resolution purposes.",
      "You may request deletion of your account and associated data at any time by contacting us.",
    ],
  },
  {
    title: "5. Cookies",
    content: [
      "We use session cookies to keep you logged in and remember your preferences.",
      "We do not use advertising or tracking cookies.",
      "You can disable cookies in your browser settings, but some features may not work correctly.",
    ],
  },
  {
    title: "6. Your Rights",
    content: [
      "Access: you can view your personal data from your Profile page at any time.",
      "Correction: you can update your information via the Edit Profile section.",
      "Deletion: email us at support@biker.com to request account and data deletion.",
      "Portability: contact us to receive a copy of your data in a common format.",
    ],
  },
  {
    title: "7. Security",
    content: [
      "We use Firebase Authentication and Firestore security rules to protect your data.",
      "All data in transit is encrypted via HTTPS/TLS.",
      "We regularly review our security practices. However, no system is 100% secure — please use a strong, unique password.",
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We'll notify you of significant changes via email or a notice on the Platform.",
      "Continued use of the Platform after changes are posted constitutes acceptance of the updated policy.",
    ],
  },
];

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-slate-900 py-14 sm:py-20 px-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-5">
          <Shield size={28} className="text-white" />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Privacy Policy
        </motion.h1>
        <p className="text-slate-400 text-sm sm:text-base">Last updated: April 2026</p>
      </section>

      {/* Highlights */}
      <section className="py-10 px-4 bg-orange-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-brand" />
              </div>
              <p className="font-semibold text-slate-800 text-xs sm:text-sm">{title}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed hidden sm:block">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Policy */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10 p-4 bg-slate-50 rounded-xl">
            This Privacy Policy explains how BikeR collects, uses, and protects your information when you use our platform. We are committed to keeping your data safe and being transparent about how it is handled.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
                <ul className="space-y-2">
                  {section.content.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                {i < sections.length - 1 && <div className="border-b border-gray-100 mt-8" />}
              </motion.div>
            ))}
          </div>

          {/* Contact for privacy */}
          <div className="mt-12 bg-slate-50 rounded-2xl p-6 text-center">
            <Mail size={28} className="text-brand mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 mb-2">Privacy Questions?</h3>
            <p className="text-sm text-slate-500 mb-4">Contact our privacy team at <span className="text-brand">support@biker.com</span></p>
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
