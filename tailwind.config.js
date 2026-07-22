/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        chip: 'rgb(var(--c-chip) / <alpha-value>)',
        border: 'rgb(var(--c-border) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          muted: 'rgb(var(--c-ink-muted) / <alpha-value>)',
          subtle: 'rgb(var(--c-ink-subtle) / <alpha-value>)',
        },
        purple: {
          DEFAULT: '#7B2FFF',
          deep: '#5B1FD1',
          dim: 'rgba(123,47,255,0.07)',
        },
        lime: {
          DEFAULT: '#7B2FFF',
          deep: '#5B1FD1',
          dim: 'rgba(123,47,255,0.07)',
        },
        gold: {
          DEFAULT: '#F0A93A',
          deep: '#C9821E',
          dim: 'rgba(240,169,58,0.12)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '20px',
      },
      boxShadow: {
        sm: '0 1px 4px rgba(20,20,28,0.06)',
        md: '0 12px 28px rgba(20,20,28,0.09)',
      },
      transitionTimingFunction: {
        evvee: 'cubic-bezier(0.2,0.6,0.2,1)',
      },
    },
  },
  plugins: [],
}
