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
        // "purple" token kept for compatibility with unedited components —
        // remapped to aso-ebi wine so the whole app reskins consistently
        purple: {
          DEFAULT: '#7A1440',
          deep: '#5A0E30',
          dim: 'rgba(122,20,64,0.07)',
        },
        // "lime" token kept for compatibility — remapped to foil gold
        lime: {
          DEFAULT: '#C79A3D',
          deep: '#8A6A24',
          dim: 'rgba(199,154,61,0.12)',
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
