module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-900': '#041022',
        'muted': '#9fb8c9',
        'accent': '#7c3aed',
        'accent-2': '#00d8ff',
        'gold': '#ffd166'
      },
      boxShadow: {
        'neon-lg': '0 12px 30px rgba(124,58,237,0.08)'
      }
    }
  },
  plugins: []
}
