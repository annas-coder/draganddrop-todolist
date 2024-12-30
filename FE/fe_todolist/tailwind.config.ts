import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow :{
        primary: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      colors: {
        primary:"#039be5",
        secondary:"#0b57d0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("rippleui")],
} satisfies Config;
