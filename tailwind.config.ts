import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "\"Trebuchet MS\"", "\"Segoe UI\"", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#fbf7ef",
          100: "#f3e9d8",
          200: "#e8d7bc",
          300: "#dbc29b",
          400: "#a7c98d",
          500: "#8faf72",
          600: "#6f8f55",
          700: "#567240",
          800: "#405831",
          900: "#293a23"
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(52, 37, 20, 0.08)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 500ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
