import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Karimnagar, Telangana, India" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "support@biker.com" },
  { icon: Clock, label: "Support Hours", value: "Mon–Sat, 9 AM – 7 PM" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const inputClass = "w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 bg-white";

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-orange-50 py-14 sm:py-20 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Get in Touch
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
          Have a question, need assistance, or want to share feedback? Our team is always ready to help you.
        </motion.p>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <motion.div key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-slate-700">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-gray-100 bg-slate-100 h-48 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="text-sm">Karimnagar, Telangana</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h2>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 bg-green-50 rounded-2xl border border-green-100">
                <CheckCircle size={52} className="text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800">Message Sent!</h3>
                <p className="text-sm text-slate-500 mt-2">Our team will respond to your message as soon as possible.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 text-brand text-sm hover:underline">Send another message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Ravi Kumar" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Message *</label>
                  <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Describe your issue or question..." className={inputClass + " resize-none"} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-brand hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-60">
                  <Send size={16} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
