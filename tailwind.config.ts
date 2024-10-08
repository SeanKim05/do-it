import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      "violet/600": "#7C3AED",
      "violet/200": "#DDD6FE",
      "violet/100": "#EDE9FE",
      "rose/500": "#F43F5E",
      "lime/300": "#BEF264",
      "amber/800": "#92400E",
      "green/700": "#15803d",
      "slate/900": "#0F172A",
      "slate/800": "#1E293B",
      "slate/500": "#6478B",
      "slate/400": "#94A3B8",
      "slate/300": "#CBD5E1",
      "slate/200": "#E2E8F0",
      "slate/100": "#F1F5F9",
    },
    screens: {
      sm: "375px",
      md: "744px",
    },

    fontFamily: {
      nanumB: ["NanumBold", "sans-serif"],
      nanumR: ["NanumRegular", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
