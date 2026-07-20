/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        surface: '#F7F7F5',
        elevated: '#FFFFFF',
        chip: '#F2F2EE',
        border: '#E7E7E2',
        purple: {
          DEFAULT: '#7B2FFF',
          deep: '#5B1FD1',
          dim: 'rgba(123,47,255,0.06)',
        },
        lime: {
          DEFAULT: '#7B2FFF',
          deep: '#5B1FD1',
          dim: 'rgba(123,47,255,0.06)',
        },
        ink: {
          DEFAULT: '#15151D',
          muted: '#68687A',
          subtle: '#9D9DAB',
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
