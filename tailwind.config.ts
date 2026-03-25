import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d7ebff",
          200: "#b4dbff",
          300: "#7ec2ff",
          400: "#45a4ff",
          500: "#1d86f7",
          600: "#0b6ad4",
          700: "#0b54aa",
          800: "#10498b",
          900: "#133f73",
        },
      },
    },
  },
  plugins: [],
};

export default config;
