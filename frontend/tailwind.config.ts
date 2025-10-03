import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#eef0f2',
          200: '#d9dde3',
          300: '#b8c0cc',
          400: '#94a2b2',
          500: '#6f8499',
          600: '#506680',
          700: '#3c4d63',
          800: '#293545',
          900: '#18202b'
        }
      },
      boxShadow: {
        glow: '0 10px 30px -10px rgba(0,0,0,0.25), inset 0 1px 0 0 rgba(255,255,255,0.15)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [],
} satisfies Config
