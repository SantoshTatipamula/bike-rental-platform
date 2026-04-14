import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAllBikes } from "@/services/bikeService";
import styles from "./PopularBikes.module.css";
import BikeCard from "@/components/bikes/BikeCard";

const PopularBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const loadBikes = async () => {
      const data = await getAllBikes();
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setBikes(shuffled.slice(0, 6));
    };
    loadBikes();
  }, []);

  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">Popular Bikes</h2>
          <p className="text-textSecondary mt-2">Most rented bikes by riders</p>
        </div>
        <div
          className={`${styles.scrollbarHide} flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4`}
        >
          {bikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[240px] sm:min-w-[260px] flex-shrink-0 snap-start"
            >
              <BikeCard bike={bike} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBikes;
