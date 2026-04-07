import { motion } from "framer-motion";

const OwnerHero = () => {
  return (
    <section className="min-h-[50vh] flex items-center justify-center bg-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl px-4"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Earn with Your Bike 🚀
        </h1>

        <p className="text-slate-600">
          List your bike and start earning passive income easily.
        </p>
      </motion.div>
    </section>
  );
};

export default OwnerHero;