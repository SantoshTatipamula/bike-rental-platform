import banner from "../../assets/Banner.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5 }}
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[90vh] bg-cover bg-center bg-black"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="relative z-10 h-full flex items-center px-6 md:px-16">
        <div className="max-w-xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm md:text-base font-semibold text-brand tracking-wide mb-2"
          >
            RIDE ANYTIME, ANYWHERE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight"
          >
            Ride, explore <br />
            and feel the road <br className="hidden sm:block" />
            like never before
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-sm md:text-base lg:text-lg mt-3 md:mt-4 max-w-md"
          >
            Discover bikes near you and start your journey with ease. Fast
            booking, affordable prices, and seamless experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4 mt-5 md:mt-6"
          >
            <Button
              onClick={() => navigate("/bikes")}
              className="bg-brand hover:bg-brandDark text-white px-6 py-3 rounded-lg text-sm font-semibold transition-transform hover:scale-105"
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
