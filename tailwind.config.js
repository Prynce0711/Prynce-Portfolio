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
          DEFAULT: "#38bdf8",
          deep: "#0ea5e9",
        },
        neon: {
          blue: "#38bdf8",
          purple: "#8b5cf6",
          pink: "#f472b6",
        },
        midnight: {
          950: "#05060d",
          900: "#0b1120",
          800: "#111827",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        body: ["Poppins", "ui-sans-serif", "system-ui"],
        heading: ["Orbitron", "Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,6,23,0.18)",
        neon: "0 0 35px rgba(56,189,248,0.35)",
        neonPurple: "0 0 35px rgba(139,92,246,0.35)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
