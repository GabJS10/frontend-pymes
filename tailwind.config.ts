import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      backgroundImage: {
        "close-menu": "url('/static/images/icon-close.svg')",
        "open-menu": "url('/static/images/icon-hamburger.svg')",
      },

      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
};
export default config;
