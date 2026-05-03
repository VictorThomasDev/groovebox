import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        groove: {
          50: '#fff7ed',
          400: '#fb923c',
          500: '#f97316',
          900: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
