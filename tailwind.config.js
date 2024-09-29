/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Blue: "#3e91cf",
      },
      fontFamily: {
        Inter: ["Inter"]
      }
    },
  },
  plugins: [],
};
