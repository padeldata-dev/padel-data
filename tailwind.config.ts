import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pdark: "#090f0f",
        pgreen: "#94d82d",
        pgreen2: "#6fba16",
        pgreen3: "#3b7f08",
        psoft: "#f4f6f5",
      },
      boxShadow: {
        card: "0 14px 35px rgba(0,0,0,.13)",
      },
    },
  },
  plugins: [],
};
export default config;
