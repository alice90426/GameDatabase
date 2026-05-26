import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#070A12",
        panel: "#0D1324",
        line: "#1F2A44",
        neon: "#4DE3FF",
        plasma: "#A855F7",
        ember: "#FF7A3D"
      },
      boxShadow: {
        glow: "0 0 32px rgba(77, 227, 255, 0.18)"
      },
      backgroundImage: {
        "tech-grid":
          "linear-gradient(rgba(77, 227, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(77, 227, 255, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
