import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-outfit)',
          '"Outfit"',
          '"GT Eesti"',
          '"Avenir Next"',
          'Avenir',
          'Circular',
          'Futura',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        cropwise: {
          emerald: '#0F5132',
          'emerald-hover': '#0B3D26',
          'emerald-light': '#15803D',
          'emerald-soft': '#EAF5EE',
          gold: '#D97706',
          'gold-hover': '#B45309',
          'gold-light': '#FEF3C7',
          soil: '#78350F',
        },
      },
    },
  },
  plugins: [],
};
export default config;
