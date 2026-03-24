import { Search, Bike, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Search Bike",
    desc: "Find bikes near your location easily",
    icon: Search,
  },
  {
    title: "Book Instantly",
    desc: "Choose your bike and confirm booking",
    icon: Bike,
  },
  {
    title: "Ride & Enjoy",
    desc: "Pick up your bike and enjoy your ride",
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-sectionLight">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-textPrimary mb-12">
          How It Works
        </h2>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center max-w-xs"
              >

                {/* Icon Circle */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand text-white mb-4 shadow-md">
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg text-textPrimary mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-textSecondary">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}