import { motion } from "framer-motion";
import styles from "./PopularBikes.module.css"
import BikeCard from "@/components/bikes/BikeCard";
import bikes from "@/data/popularData"


export default function PopularBikes() {
  return (
    <section className={` w-full py-20 bg-white `}>

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
            Popular Bikes
          </h2>
          <p className="text-textSecondary mt-2">
            Most rented bikes by riders
          </p>
        </div>

        {/* Horizontal Scroll */}
        <div className={`${styles.scrollbarHide} flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4`}>

          {bikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[260px] snap-start"
            >
              <BikeCard bike={bike} />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}