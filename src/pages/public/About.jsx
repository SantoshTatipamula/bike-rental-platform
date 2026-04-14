import { motion } from "framer-motion";
import { Bike, Users, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Drive from "@/assets/Drive.png";

const stats = [
  { label: "Bikes Listed", value: "500+", icon: Bike },
  { label: "Happy Riders", value: "10,000+", icon: Users },
  { label: "Cities Covered", value: "12+", icon: MapPin },
  { label: "Avg. Rating", value: "4.8★", icon: Star },
];

const team = [
  { name: "Santosh Tatipamula", role: "Founder & CEO", initial: "R" },
  { name: "Sneha Reddy", role: "Head of Operations", initial: "S" },
  { name: "Arjun Sharma", role: "Tech Lead", initial: "A" },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-orange-50 py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-semibold text-brand tracking-widest uppercase mb-4"
          >Our Story</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            Making Every Ride<br className="hidden sm:block" /> Accessible & Affordable
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto"
          >
            BikeR was created with a simple vision — to make bike rentals easy, flexible, and accessible. Our platform connects bike owners with riders who need a convenient and affordable way to travel, without the burden of owning a vehicle.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-center p-5 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-brand" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We believe mobility should be simple, affordable, and accessible to everyone. BikeR enables bike owners to earn from their unused vehicles while giving riders quick access to reliable transportation whenever they need it.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you're a student, a daily commuter, or someone exploring the city, BikeR helps you find the right bike at the right time with minimal effort.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="flex-1">
            <img src={Drive} alt="Riding" className="rounded-2xl shadow-md w-full object-cover max-h-72 sm:max-h-80" />
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 text-center border border-gray-100"
              >
                <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{member.initial}</span>
                </div>
                <p className="font-semibold text-slate-800">{member.name}</p>
                <p className="text-sm text-slate-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-orange-50 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Ready to ride with us?</h2>
        <p className="text-slate-600 mb-8">Join thousands of riders already on the platform.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate("/bikes")}
            className="bg-brand hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition">
            Browse Bikes
          </button>
          <button onClick={() => navigate("/become-owner")}
            className="border border-brand text-brand hover:bg-orange-50 px-8 py-3 rounded-xl font-semibold transition">
            List Your Bike
          </button>
        </div>
      </section>
    </div>
  );
}
