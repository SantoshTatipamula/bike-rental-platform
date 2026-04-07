
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import categories from "@/data/categoriesData";


export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-sectionLight">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-textPrimary mb-10 text-center"
        >
          Browse by Category
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/bikes?category=${cat.name}`)}
                className="cursor-pointer bg-card rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition border border-gray-200"
              >
                <div className="bg-brand/10 text-brand p-4 rounded-full mb-4 ">
                  <Icon size={28} />
                </div>

                <p className="text-sm md:text-base font-semibold text-textPrimary">
                  {cat.name}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}