import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        correct: '#6aaa64',
        present: '#c9b458',
        absent: '#787c7e',
        'tile-bg': '#ffffff',
        'tile-border': '#d3d6da',
        'key-bg': '#d3d6da',
      },
    },
  },
  plugins: [],
} satisfies Config;
