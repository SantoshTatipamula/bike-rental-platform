import { motion } from "framer-motion";
import BikeCard from "@/components/BikeCard";

const bikes = [
  {
    id: 1,
    name: "Royal Enfield Classic",
    location: "Karimnagar",
    price: "₹200/hr",
    rating:4.5,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65",
  },
  {
    id: 2,
    name: "KTM Duke 200",
    location: "Karimnagar",
    price: "₹180/hr",
    rating:4.3,
    image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6",
  },
  {
    id: 3,
    name: "Activa 6G",
    location: "Karimnagar",
    price: "₹100/hr",
    rating:4.1,
    image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d",
  },
  {
    id: 4,
    name: "Yamaha R15",
    location: "Karimnagar",
    price: "₹220/hr",
    rating:4.9,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
  },
];

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