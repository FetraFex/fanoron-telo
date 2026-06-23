import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        panel: {
          DEFAULT: "#ffffff",
          soft: "#f8fafc",
          border: "#e2e8f0"
        },
        wood: {
          light: "#c98a4b",
          DEFAULT: "#a86a35",
          dark: "#7a4a22",
          shadow: "#4a2c14"
        },
        accent: {
          DEFAULT: "#3b82f6",
          soft: "#60a5fa"
        },
        playerX: {
          DEFAULT: "#3b82f6",
          soft: "#1d4ed8"
        },
        playerO: {
          DEFAULT: "#a855f7",
          soft: "#7e22ce"
        },
        good: {
          DEFAULT: "#16a34a",
          soft: "#15803d"
        },
        warn: {
          DEFAULT: "#d97706",
          soft: "#b45309"
        }
      },
      boxShadow: {
        glowBlue: "0 0 0 4px rgba(59, 130, 246, 0.18), 0 0 14px rgba(59, 130, 246, 0.3)",
        glowPurple: "0 0 0 4px rgba(168, 85, 247, 0.18), 0 0 14px rgba(168, 85, 247, 0.3)",
        glowGreen: "0 0 0 4px rgba(34, 197, 94, 0.18), 0 0 14px rgba(34, 197, 94, 0.3)",
        glowAmber: "0 0 0 4px rgba(245, 158, 11, 0.18), 0 0 14px rgba(245, 158, 11, 0.3)",
        card: "0 4px 14px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        "wood-grain":
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(160deg, #c98a4b 0%, #a86a35 45%, #7a4a22 100%)",
        "hero-leaves":
          "linear-gradient(180deg, rgba(248,250,252,0.15) 0%, rgba(248,250,252,0.97) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
