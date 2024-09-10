const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'r-white': "var(--white)",
        'r-black': "var(--black)",
        'r-gray': "var(--gray)",
        'r-green': "var(--green)",
        'r-blue': "var(--blue)",
        'r-ash': "var(--ash)",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
