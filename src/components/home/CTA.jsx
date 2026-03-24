import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/Road.jpg";

export default function CTA() {
  const navigate = useNavigate();

  return (
    // FULL WIDTH SECTION
    <section className="w-full py-20 bg-sectionLight">

      {/* CONTAINER (same as other sections) */}
      <div className="max-w-7xl mx-auto px-6">

        {/* CTA BOX */}
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-black/70 bg-black/50+bg-brand/60 "></div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 py-16 md:py-20 text-white">

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              Start Your Ride Today 🚀
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-orange-100 mb-8"
            >
              Join thousands of riders already using BikeRent
            </motion.p>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/bikes")}
              className="bg-white text-brand px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
            >
              Explore Bikes
            </motion.button>

          </div>
        </div>

      </div>
    </section>
  );
}