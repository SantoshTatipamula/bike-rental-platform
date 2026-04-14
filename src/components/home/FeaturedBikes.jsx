import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAllBikes } from "@/services/bikeService";
import BikeCard from "@/components/bikes/BikeCard";

const FeaturedBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const loadBikes = async () => {
      const data = await getAllBikes();
      setBikes(data.slice(0, 4));
    };
    loadBikes();
  }, []);

  return (
    <section className="w-full py-12 md:py-20 bg-[#f3f0e979]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">Featured Bikes</h2>
          <p className="text-textSecondary mt-2">Find the perfect bike for your ride</p>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <BikeCard bike={bike} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;
