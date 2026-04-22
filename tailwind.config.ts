import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ---------------- FONTS ---------------- */
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
      },

      /* ---------------- COLORS (CLEAN SYSTEM) ---------------- */
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        /* Your brand colors */
        brand: {
          50: "#edfafa",
          100: "#d5f5f6",
          200: "#afeced",
          300: "#7ddfe0",
          400: "#45c9cb",
          500: "#2aacaf",
          600: "#1e8a8d",
          700: "#1c6f72",
          800: "#1c595c",
          900: "#1a4a4d",
          950: "#0a2e30",
        },

        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#cedace",
          300: "#adc0ad",
          400: "#859f85",
          500: "#668366",
          600: "#506750",
          700: "#405340",
          800: "#354335",
          900: "#2d382d",
        },
      },

      /* ---------------- RADIUS SYSTEM ---------------- */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ---------------- SHADOWS ---------------- */
      boxShadow: {
        soft: "0 2px 15px rgba(0,0,0,0.06)",
        medium: "0 10px 30px rgba(0,0,0,0.10)",
        large: "0 20px 60px rgba(0,0,0,0.15)",
        brand: "0 10px 40px rgba(42,172,175,0.25)",
      },

      /* ---------------- ANIMATIONS ---------------- */
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out",
      },
    },
  },
  plugins: [],
}

export default config
