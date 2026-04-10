import { motion } from "framer-motion";
import { Bike, IndianRupee, Calendar, Activity } from "lucide-react";

const StatsCards = ({ stats }) => {
  const data = [
    {
      title: "Total Bikes",
      value: stats.totalBikes,
      icon: Bike,
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: Calendar,
    },
    {
      title: "Earnings",
      value: `₹${stats.earnings}`,
      icon: IndianRupee,
    },
    {
      title: "Active Rentals",
      value: stats.activeRentals || 0, // optional
      icon: Activity,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => {
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
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-2xl font-bold">{item.value}</h3>
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