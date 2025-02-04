// tailwind.config.js

export default {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-up": "slide-up 0.8s ease-out forwards",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
