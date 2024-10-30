/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        georgia: ["Georgia", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        darkBrown: "#3B2216",
        cream: "#F3E7D5",
      },
    },
  },
  plugins: [],
};
