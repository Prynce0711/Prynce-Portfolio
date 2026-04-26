export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,6,23,0.18)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
