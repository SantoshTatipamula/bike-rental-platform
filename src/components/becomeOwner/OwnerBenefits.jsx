import { motion } from "framer-motion";

const benefits = [
  { title: "Earn Extra Income", desc: "Make money from your unused bike." },
  { title: "Flexible Availability", desc: "Rent whenever you want." },
  { title: "Secure Platform", desc: "We connect trusted renters." },
];

const OwnerBenefits = () => {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-semibold">Why Become Owner?</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
          >
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OwnerBenefits;
