module.exports = {
  content: ["./**/*.{html}", "./**/**/*.{html}", "./**/**/**/*.{html}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
