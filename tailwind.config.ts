import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-primary": "#0d0d0d",
        "dark-secondary": "#1a1a1a",
        "theme-primary": "#38699b",
        "theme-primary-light": "#66a6d9",
        "theme-secondary": "#5e60c7",
        "font-primary": "#f2f2f2",
        "font-secondary": "#808080",
        "todo-red": "#dc2626",
        "todo-orange": "#fb923c",
        "todo-yellow": "#facc15",
        "todo-green": "#22c55e",
        "todo-blue": "#3b82f6",
        "todo-purple": "#5b21b6",
        "todo-pink": "#a855f7",
        "todo-rose": "#f43f5e",
        "todo-beige": "#a8a29e",
      },
    },
  },
  plugins: [],
} satisfies Config;
