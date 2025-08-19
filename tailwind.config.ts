import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for dark blue theme based on screenshot
        'grindgrid-bg': 'hsl(220 30% 15%)', // Dark blue background
        'grindgrid-card': 'hsl(220 25% 20%)', // Slightly lighter card background
        'grindgrid-accent': 'hsl(217.2 91.2% 59.8%)', // Bright blue accent (keeping this)
        'grindgrid-shadow-light': 'hsl(220 25% 25%)', // Lighter shadow for dark theme
        'grindgrid-shadow-dark': 'hsl(220 30% 10%)', // Darker shadow for dark theme
        'grindgrid-text-primary': 'hsl(0 0% 95%)', // Light text for dark background
        'grindgrid-text-secondary': 'hsl(220 15% 70%)', // Slightly dimmed secondary text
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'neumorphic': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'neumorphic-sm': '0 2px 6px rgba(0, 0, 0, 0.25)',
        'neumorphic-inset': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
