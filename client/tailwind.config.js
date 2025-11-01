module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animatecss")({
      classes: ["fade", "bounce", "flash"],
      settings: {},
      variants: ["responsive"],
    }),
  ],
}
