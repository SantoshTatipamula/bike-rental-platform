import { motion } from "framer-motion";
import BikeCard from "@/components/bikes/BikeCard";
import bikes from "@/data/FeaturedData";

export default function FeaturedBikes() {
  return (
    <section className="w-full py-20 bg-[#f3f0e979]">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
            Featured Bikes
          </h2>
          <p className="text-textSecondary mt-2">
            Find the perfect bike for your ride
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {bikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BikeCard bike={bike} />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}