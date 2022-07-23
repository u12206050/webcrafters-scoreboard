module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-10': 'rgba(255, 255, 255, 0.1)',
        'white-30': 'rgba(255, 255, 255, 0.3)',
        'white-50': 'rgba(255, 255, 255, 0.5)',
        'white-70': 'rgba(255, 255, 255, 0.7)',

        'blue': '#1f498f',
        'blue-alt': '#2659AE',
        'yellow': '#f5c13e'
      }
    },
  },
  plugins: [],
}