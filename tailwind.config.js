/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.html", "./js/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'todolistlight': "url('/img/light 1.png')",
        'todolistdark': "url('/img/dark 1.jpg')",
        'shoppinglight': "url('/img/light 2.jpg')",
        'shoppingdark': "url('/img/dark 2.png')"
      }
    },
  },
  plugins: [],
}

