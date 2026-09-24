/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../appConfig.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A1615',
          gold: '#D4AF37',
          goldLight: '#F5E296',
          goldDark: '#AA820A',
          bgLight: '#FAF8F5',
          ivory: '#F4EFE6',
          surface: '#FFFFFF',
          muted: '#66615B',
          border: '#E8E2D9'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(26, 22, 21, 0.08)',
        'luxury-hover': '0 30px 60px -20px rgba(212, 175, 55, 0.22)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
