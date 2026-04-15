/** @type {import('tailwindcss').Config} */

const colors = [
  "red","orange","amber","yellow","lime","green","emerald","teal",
  "cyan","sky","blue","indigo","violet","purple","fuchsia","pink",
  "rose","slate","gray","zinc","neutral","stone","white","black"
];

const shades = [100,200,300,400,500,600,700,800,900];

const utilities = ["bg", "text", "border", "from", "to"];

const safelist = [];

// generate color classes
for (const util of utilities) {
  for (const color of colors) {
    for (const shade of shades) {
      safelist.push(`${util}-${color}-${shade}`);
    }
  }
}

// spacing (mr-12, ml-12)
safelist.push("mr-12", "ml-12");

module.exports = {
  content: ["./public/index.html"],
  safelist,
  theme: {
    extend: {
      colors: {
        white: {
          900: "#ffffff",
          800: "#efefef",
          700: "#dfdfdf",
          600: "#cfcfcf",
          500: "#bfbfbf",
          400: "#afafaf",
          300: "#9f9f9f",
          200: "#8f8f8f",
          100: "#7f7f7f",
        },
        black: {
          100: "#808080",
          200: "#707070",
          300: "#606060",
          400: "#505050",
          500: "#404040",
          600: "#303030",
          700: "#202020",
          800: "#101010",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};