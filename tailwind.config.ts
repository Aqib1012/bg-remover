import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1B19",
        charcoal2: "#26241F",
        paper: "#F7F5F0",
        teal: "#4F8C82",
        tealLight: "#7FB8AD",
        amber: "#D9A441",
        rust: "#B85C38",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
