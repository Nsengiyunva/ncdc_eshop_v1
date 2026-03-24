/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],

  plugins: [require("tw-elements/dist/plugin")],
  theme: {
    extend: {
      colors: {
        "base-color": "#232F3F",
        "footer-color": "#323232",
        "footer-head": "#282828",
      },
      fontFamily: {
        homepage: ["Bakbak One", "cursive"],
      },
      skew: {
        25: "25deg",
      },
    },
  },
};
