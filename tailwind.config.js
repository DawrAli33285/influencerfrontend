// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'], 
//       },
//     },
//   },
//   plugins: [],
// }

  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        },
        fontSize: {
          'base': "15px"
        },
        colors: {
          'primary-green': "#1DBF73",
          'primary-dark': '#222222',
          'primary-dark-300': '#1F4B3F',
          'primary-orange': '#FFA800',
          'primary-blue': '#00A3FF',
          'primary-blue-300': '#F1FAFF',
          'primary-pink': '#F1416C',
          'primary-pink-300': '#FFEDE8',
          'primary-pink-400': '#FADADD4D',
          'primary-yellow-300': '#FFF4DE',
          'primary-sea-green': '#F1FCFA',
          'primary-sea-green-300': '#1DBF730D',
          'primary-sea-green-500': '#00D5FF12',
          'primary-sea-green-200': '#1DBF7314',
          'primary-gray-300': '#E9E9E9',
          'primary-gray-500': '#6B7177',
        },
        container: {
          center: true,
          padding: '1rem',
          screens: {
            'sm': '576px',
            'md': '992px',
            'lg': '1420px',
          },
        },
        boxShadow: {
          'custom': "0px 8px 24px 0px #959DA533"
        }
      },
    },
    plugins: [],
  }

