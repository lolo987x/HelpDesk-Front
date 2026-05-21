/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Esto hace que 'font-sans' use Inter automáticamente
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
};
