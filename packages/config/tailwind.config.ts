import type { Config } from 'tailwindcss'

const config: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors
        background: '#0a0a0b',
        surface: '#111113',
        'surface-elevated': '#18181b',
        panel: '#0d0d0f',
        border: '#27272a',
        'border-strong': '#3f3f46',
        
        // Text colors
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
        
        // Accent colors (Cyan)
        accent: '#22d3ee',
        'accent-hover': '#06b6d4',
        'accent-muted': 'rgba(34, 211, 238, 0.1)',
        
        // Semantic colors
        success: '#22c55e',
        'success-muted': 'rgba(34, 197, 94, 0.1)',
        warning: '#eab308',
        'warning-muted': 'rgba(234, 179, 8, 0.1)',
        error: '#ef4444',
        'error-muted': 'rgba(239, 68, 68, 0.1)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(34, 211, 238, 0.3)',
        'glow-strong': '0 0 60px -5px rgba(34, 211, 238, 0.5)',
        'glow-sm': '0 0 20px -5px rgba(34, 211, 238, 0.2)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px -4px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
