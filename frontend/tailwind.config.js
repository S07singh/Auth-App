/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
        },
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [
    import('@tailwindcss/forms'),
  ],
} 