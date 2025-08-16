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
        // Custom colors for neumorphic/SkillForge style
        'grindgrid-bg': 'hsl(220 13% 95%)', // Light background for neumorphism
        'grindgrid-card': 'hsl(220 13% 98%)', // Slightly lighter card background
        'grindgrid-accent': 'hsl(217.2 91.2% 59.8%)', // Bright blue accent
        'grindgrid-shadow-light': 'hsl(220 13% 100%)', // Light shadow for neumorphism
        'grindgrid-shadow-dark': 'hsl(220 13% 85%)', // Dark shadow for neumorphism
        'grindgrid-text-primary': 'hsl(240 5.3% 26.1%)',
        'grindgrid-text-secondary': 'hsl(240 3.7% 45.9%)',
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
        'neumorphic': '8px 8px 16px hsl(var(--grindgrid-shadow-dark)), -8px -8px 16px hsl(var(--grindgrid-shadow-light))',
        'neumorphic-sm': '4px 4px 8px hsl(var(--grindgrid-shadow-dark)), -4px -4px 8px hsl(var(--grindgrid-shadow-light))',
        'neumorphic-inset': 'inset 4px 4px 8px hsl(var(--grindgrid-shadow-dark)), inset -4px -4px 8px hsl(var(--grindgrid-shadow-light))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
