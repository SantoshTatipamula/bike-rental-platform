import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h1 className="text-2xl font-semibold text-textPrimary">
        Welcome back 👋
      </h1>
      <p className="text-textSecondary mt-1">
        Manage your bikes and bookings easily
      </p>
    </motion.div>
  );
};

export default DashboardHeader;