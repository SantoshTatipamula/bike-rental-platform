import { motion } from "framer-motion";
import { Bike, IndianRupee, Calendar, Activity } from "lucide-react";

const StatsCards = ({ stats }) => {
  const data = [
    { title: "Total Bikes", value: stats.totalBikes, icon: Bike },
    { title: "Bookings", value: stats.totalBookings, icon: Calendar },
    { title: "Earnings", value: `₹${stats.earnings}`, icon: IndianRupee },
    { title: "Active Rentals", value: stats.activeRentals || 0, icon: Activity },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {data.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm flex items-center justify-between gap-2"
          >
            <div>
              <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
              <h3 className="text-xl sm:text-2xl font-bold">{item.value}</h3>
            </div>
            <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
              <Icon className="text-brand w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
