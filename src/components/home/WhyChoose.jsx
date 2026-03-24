import { Bike, Wallet, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Wide Selection",
    desc: "Choose from a variety of bikes for every need",
    icon: Bike,
  },
  {
    title: "Affordable Prices",
    desc: "Best prices with no hidden charges",
    icon: Wallet,
  },
  {
    title: "Easy Booking",
    desc: "Book your ride in just a few clicks",
    icon: ShieldCheck,
  },
];

export default function WhyChoose() {
  return (
    <section className="w-full py-20 bg-gray-50">
      
      {/* Inner Container */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
            Why Choose BikeRent?
          </h2>

          <p className="text-textSecondary mt-3 max-w-xl mx-auto">
            Experience smooth, affordable and reliable bike rentals anytime.
          </p>
        </motion.div>

        {/* Cards Wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-brand/10">
                  <Icon className="text-brand" size={28} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-textPrimary mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-textSecondary leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}