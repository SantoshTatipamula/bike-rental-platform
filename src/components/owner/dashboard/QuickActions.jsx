import { motion } from "framer-motion";
import { PlusCircle, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { title: "Add New Bike", icon: PlusCircle,navigation:"/owner/add-bike" },
  { title: "Manage Bikes", icon: Bike, navigation:"/owner/my-bikes" },
];

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="flex gap-4 flex-wrap">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.navigation) }
              className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg"
            >
              <Icon size={18} />
              {action.title}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;