/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // azul
        secondary: "#facc15", // amarillo
        light: "#f9fafb", // gris claro
      },
    },
  },
  plugins: [],
};
