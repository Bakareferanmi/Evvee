/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm ivory paper — replaces pure white/near-white surfaces
        bg: '#FBF3E4',
        surface: '#F3E7CE',
        elevated: '#FFFDF7',
        chip: '#F1E4C8',
        border: '#E4D3AC',
        // Deep aubergine-ink — replaces flat black text tones
        ink: {
          DEFAULT: '#1B0F14',
          muted: '#6E5D50',
          subtle: '#A8977F',
        },
        // "purple" token — back to the original bright violet accent
        purple: {
          DEFAULT: '#7B2FFF',
          deep: '#5B1FD1',
          dim: 'rgba(123,47,255,0.07)',
        },
        // "lime" token aliased to the same purple, for one uniform accent color
        lime: {
          DEFAULT: '#7B2FFF',
          deep: '#5B1FD1',
          dim: 'rgba(123,47,255,0.07)',
        },
        emerald: {
          DEFAULT: '#1F6B4D',
          deep: '#164E39',
          dim: 'rgba(31,107,77,0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Fraunces', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
      },
      boxShadow: {
        sm: '0 1px 4px rgba(27,15,20,0.08)',
        md: '0 14px 32px rgba(27,15,20,0.14)',
      },
      transitionTimingFunction: {
        evvee: 'cubic-bezier(0.2,0.6,0.2,1)',
      },
    },
  },
  plugins: [],
}
