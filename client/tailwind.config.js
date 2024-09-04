/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ff0000",
        strokedark: "#2E3A47",
        boxdark: "#111111",
        "meta-1": "#DC3545",
        "meta-2": "#EFF2F7",
        "meta-3": "#10B981",
        "meta-4": "#313D4A",
        "meta-5": "#259AE6",
      },
    },
  },
  plugins: [],
};
