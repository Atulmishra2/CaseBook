/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'adv-bg': '#F5F5F7',
        'adv-surface': '#FFFFFF',
        'adv-border': '#E5E7EB',
        'adv-ink': '#111827',
        'adv-body': '#374151',
        'adv-muted': '#6B7280',
        'adv-light': '#9CA3AF',
      },
      backgroundImage: {
        'grad-nav': 'linear-gradient(180deg, #1F2937 0%, #0F172A 100%)',
        'grad-primary': 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
      },
    },
  },
  plugins: [],
};
