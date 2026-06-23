import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        board: {
          light: "#f8fafc",
          dark: "#0f172a"
        },
        accent: {
          DEFAULT: "#0ea5e9",
          soft: "#7dd3fc"
        }
      },
      boxShadow: {
        glow: "0 0 0 4px rgba(14, 165, 233, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
