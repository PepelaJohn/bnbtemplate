
/* Add any additional custom styles here */

// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#541414',
          'secondary': '#e8b84a',
          'accent': '#f472b6',
        },
        fontFamily: {
          'sans': ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  