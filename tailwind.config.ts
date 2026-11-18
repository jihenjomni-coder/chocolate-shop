import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          950: "#160B06",
          900: "#24120A",
          800: "#381C10",
          700: "#4E2817",
          600: "#6B3820",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FBF6EC",
          200: "#F5EAD6",
          300: "#EAD6B5",
        },
        gold: {
          300: "#F3D78A",
          400: "#E4BE5B",
          500: "#C99E32",
          600: "#A87E1E",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
