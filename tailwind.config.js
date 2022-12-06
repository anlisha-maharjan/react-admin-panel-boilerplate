/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cde8db",
          200: "#9ad1b7",
          300: "#68ba94",
          400: "#35a370",
          500: "#038c4c",
          600: "#02703d",
          700: "#02542e",
          800: "#01381e",
          900: "#011c0f",
        },
      },
    },
  },
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
};
