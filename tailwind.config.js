/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      }
    },
  },
  plugins: [],
}