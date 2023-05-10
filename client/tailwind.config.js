/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      black: "#000000",
      primary: "#4071F0",
      primari10: "#ECF1FE",
      secondary: "#FFFFFF",
      accent: "#FED64B",
      neutral: {
        10: "#ECF1FD",
        50: "#F4F7FA",
        200: "#DEE4EB",
        400: "#A8B5C2",
        600: "#6A7682",
        800: "#353B41",
        900: "#1B1D21",
        alert: "#FFF5EB",
      },
      fail_alert: "#F59536",
      error: "#FF5757",
      blue: "#B3C6F9",
      success: "#70C70D",
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
