import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f2fbed",
          100: "#ddf7d0",
          200: "#bceda7",
          300: "#8cdf70",
          400: "#5fcb3d",
          500: "#39a91f",
          600: "#2a8b16",
          700: "#236d16",
          800: "#1f5617",
          900: "#184514"
        },
        forest: "#006f32",
        ginger: "#f47c16",
        gold: "#d7a43a",
        ink: "#1f2421"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(31, 36, 33, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
