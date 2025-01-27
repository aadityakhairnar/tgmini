const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths based on your project structure
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--bg-surface)",
          transparent: "var(--bg-surface-transparent)",
          low: "var(--bg-surface-low)",
          normal: "var(--bg-surface-normal)",
          hover: "var(--bg-surface-hover)",
          active: "var(--bg-surface-active)",
        },
        primary: {
          DEFAULT: "var(--bg-primary)",
          hover: "var(--bg-primary-hover)",
          active: "var(--bg-primary-active)",
        },
        positive: {
          DEFAULT: "var(--bg-positive)",
          hover: "var(--bg-positive-hover)",
        },
        caution: {
          DEFAULT: "var(--bg-caution)",
          hover: "var(--bg-caution-hover)",
        },
        danger: {
          DEFAULT: "var(--bg-danger)",
          hover: "var(--bg-danger-hover)",
        },
      },
    },
  },
  plugins: [],
};
