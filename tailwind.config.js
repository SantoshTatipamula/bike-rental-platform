/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  colors: {
    brand: "#f97316",        // main orange
    brandDark: "#ea580c",    // hover orange
    background: "#f8fafc",   // page background
    card: "#ffffff",         // card background
    textPrimary: "#020617",  // main text
    textSecondary: "#64748b",// secondary text
    success: "#22c55e",      // available bikes
    danger: "#ef4444",       // errors/admin
    
    // --- New Section Backgrounds ---
    sectionLight: "#f1f5f9", // subtle alternating gray
    sectionBrand: "#fff7ed", // warm orange tint for highlights
    sectionDark: "#0f172a",  // deep slate for footers/CTAs
  },
},
  },
  plugins: [],
}