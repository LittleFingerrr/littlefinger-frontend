import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        "montserrat-subrayada": ["var(--font-montserrat-subrayada)"],
        lato: ["var(--font-lato)"],
      },

      colors: {
        primary: "#F2A42C",
        secondary: "#070602",
        tertiary: "#3B3B45",
        "primary-glow": "#F3A42C4D",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
