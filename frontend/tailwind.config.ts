import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        error: "var(--error-color)",
        success: "var(--success-color)",
        info: "var(--info-color)",
        disable: "var(--disable-color)",
        toast: "var(--toast-color)",
        'disable-text':"var(--disable-text-color)",
        'dark-primary':"var(--dark-primary)"
      },
    },
  },
  plugins: [],
} satisfies Config;
