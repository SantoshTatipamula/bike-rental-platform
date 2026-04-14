import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import banner from "../../assets/Road.jpg";

export default function CTA({ title, description, buttonText, link }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // ✅ FIXED CONDITION
    if (location.pathname.includes("become-owner")) {
      const section = document.getElementById("owner-form");

      if (section) {
        const yOffset = -80;
        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      navigate(link);
    }
  };

  return (
    <section className="w-full py-12 md:py-20 bg-sectionLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="w-full rounded-2xl overflow-hidden relative"
          style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-black/70" />
          <div className="relative z-10 text-center px-6 py-12 sm:py-16 md:py-20 text-white">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-orange-100 mb-8 max-w-lg mx-auto"
            >
              {description}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleClick}
              className="bg-white text-brand px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
            >
              {buttonText}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
