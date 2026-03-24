import { motion } from "framer-motion";
import styles from "./PupularBikes.module.css"
import BikeCard from "@/components/BikeCard";

const bikes = [
  { id: 1, name: "R15", price: "₹180/hr", location: "Karimnagar", image: "https://images.unsplash.com/photo-1549924231-f129b911e442" },
  { id: 2, name: "Duke 200", price: "₹160/hr", location: "Karimnagar", image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6" },
  { id: 3, name: "Activa 6G", price: "₹90/hr", location: "Karimnagar", image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d" },
  { id: 4, name: "Classic 350", price: "₹220/hr", location: "Karimnagar", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65" },
  { id: 5, name: "Apache RTR", price: "₹150/hr", location: "Karimnagar", image: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee" },
];

export default function PopularBikes() {
  return (
    <section className={` flex gap-6 overflow-x-auto w-full py-20 bg-white `}>

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