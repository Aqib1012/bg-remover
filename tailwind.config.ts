import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F2",
        card: "#FFFFFF",
        ink: "#211F1C",
        inkSoft: "#5A564E",
        border: "#EAE3D6",
        teal: "#1F9E8E",
        tealDeep: "#157A6D",
        tealSoft: "#E4F6F2",
        coral: "#F4794E",
        coralSoft: "#FDE9E0",
        amber: "#E8A93C",
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
