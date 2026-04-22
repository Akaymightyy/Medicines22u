import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50:  '#edfafa',
          100: '#d5f5f6',
          200: '#afeced',
          300: '#7ddfe0',
          400: '#45c9cb',
          500: '#2aacaf',
          600: '#1e8a8d',
          700: '#1c6f72',
          800: '#1c595c',
          900: '#1a4a4d',
          950: '#0a2e30',
        },
        sage: {
          50:  '#f4f7f4',
          100: '#e6ede6',
          200: '#cedace',
          300: '#adc0ad',
          400: '#859f85',
          500: '#668366',
          600: '#506750',
          700: '#405340',
          800: '#354335',
          900: '#2d382d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(180,70%,90%,0.5) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,70%,88%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(170,60%,88%,0.4) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'soft':    '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'medium':  '0 4px 25px -5px rgba(0,0,0,0.1), 0 10px 30px -5px rgba(0,0,0,0.06)',
        'large':   '0 10px 40px -10px rgba(0,0,0,0.15), 0 20px 50px -10px rgba(0,0,0,0.08)',
        'brand':   '0 8px 30px -5px rgba(42,172,175,0.35)',
        'card':    '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
