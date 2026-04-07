import { motion } from "framer-motion";
import { Bike, IndianRupee, Calendar, Activity } from "lucide-react";

const stats = [
  { title: "Total Bikes", value: 12, icon: Bike },
  { title: "Bookings", value: 34, icon: Calendar },
  { title: "Earnings", value: "₹12,500", icon: IndianRupee },
  { title: "Active Rentals", value: 5, icon: Activity },
];

const StatsCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-textSecondary text-sm">{item.title}</p>
              <h2 className="text-xl font-semibold text-textPrimary">
                {item.value}
              </h2>
            </div>

            <div className="bg-orange-100 p-3 rounded-full">
              <Icon className="text-brand w-5 h-5" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;