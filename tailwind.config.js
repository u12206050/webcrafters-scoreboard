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

        'background': 'var(--background)',
        'prime': 'var(--prime)',
        'alt': 'var(--alt)',
        'numbers': 'var(--numbers)',
        'highlighted': 'var(--highlighted)',
      }
    },
  },
  plugins: [],
}