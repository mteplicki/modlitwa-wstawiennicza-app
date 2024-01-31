/** @type {import('tailwindcss').Config} */
export default {
  content: [    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'max-h': 'max-height'
      },
      colors: {
        "primary": "#2573a6",
        "secondary": "#e8f1fe",
        "tertiary": "#a1d929",
        "primary-dark": "#58A6DA",
        "secondary-dark": "#010B18"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('preline/plugin'),
  ],
}

