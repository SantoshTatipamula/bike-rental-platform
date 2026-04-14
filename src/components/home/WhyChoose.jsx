import { Bike, Wallet, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { title: "Wide Selection", desc: "Choose from a variety of bikes for every need", icon: Bike },
  { title: "Affordable Prices", desc: "Best prices with no hidden charges", icon: Wallet },
  { title: "Easy Booking", desc: "Book your ride in just a few clicks", icon: ShieldCheck },
];

export default function WhyChoose() {
  return (
    <section className="w-full py-12 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
            Why Choose BikeRent?
          </h2>
          <p className="text-textSecondary mt-3 max-w-xl mx-auto">
            Experience smooth, affordable and reliable bike rentals anytime.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 flex items-center justify-center rounded-full bg-brand/10">
                  <Icon className="text-brand" size={26} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-textPrimary mb-2">{item.title}</h3>
                <p className="text-sm text-textSecondary leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
