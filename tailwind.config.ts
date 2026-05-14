import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        navy:   { DEFAULT: '#0B1F3A', mid: '#163359', light: '#1E4480' },
        accent: { DEFAULT: '#C8A96E', light: '#E8D5A3', dark: '#9A7A45' },
      },
    },
  },
  plugins: [],
};

export default config;
