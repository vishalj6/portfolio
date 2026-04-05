module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        themeCard: 'var(--theme-card)',
        themeBorder: 'var(--theme-border-main)',
        themeTextMain: 'var(--theme-text-main)',
        themeTextMuted: 'var(--theme-text-muted)',
        glassBg: 'var(--glass-bg)',
      },
      backdropBlur: {
        sm: '4px',
        md: '10px',
        lg: '32px',
      },
      saturate: {
        180: '180%',
      },
      boxShadow: {
        panel: '0 24px 64px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 0.5px rgba(255,255,255,0.04) inset',
      },
      keyframes: {
        msgSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dotBounce: {
          '0%,80%,100%': { transform: 'translateY(0)', opacity: '0.3' },
          '40%': { transform: 'translateY(-5px)', opacity: '1' },
        },
      },
      animation: {
        msgSlideIn: 'msgSlideIn 0.22s cubic-bezier(0.22,1,0.36,1) forwards',
        dotBounce: 'dotBounce 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
