/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#635FC7',
        'purple-light': '#A8A4FF',
        black: '#000112',
        'black-light': '#20212C',
        'gray-dark': '#2B2C37',
        'gray-med': '#3E3F4E',
        'gray-light': '#828FA3',
        'gray-bright': '#E4EBFA',
        linen: '#F4F7FD',
        white: '#FFFFFF',
        red: '#EA5555',
        'red-light': '#FF9898',
      },
      fontSize: {
        sm: '12px',
        md: '15px',
        lg: '18px',
        xl: '24px',
      },
    },
  },
  plugins: [],
}
