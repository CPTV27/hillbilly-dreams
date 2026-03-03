// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
    '../../packages/config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        surface2:  'var(--surface-2)',
        surface3:  'var(--surface-3)',
        text:      'var(--text)',
        muted:     'var(--text-muted)',
        disabled:  'var(--text-disabled)',
        accent:    'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        slate:     'var(--slate)',
        success:   'var(--success)',
        warning:   'var(--warning)',
        error:     'var(--error)',
        border:    'var(--border)',
        'border-strong': 'var(--border-strong)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
      fontSize: {
        'xs':   ['var(--text-xs)',   { lineHeight: '1.4' }],
        'sm':   ['var(--text-sm)',   { lineHeight: '1.5' }],
        'base': ['var(--text-base)', { lineHeight: '1.6' }],
        'md':   ['var(--text-md)',   { lineHeight: '1.6' }],
        'lg':   ['var(--text-lg)',   { lineHeight: '1.5' }],
        'xl':   ['var(--text-xl)',   { lineHeight: '1.4' }],
        '2xl':  ['var(--text-2xl)',  { lineHeight: '1.3' }],
        '3xl':  ['var(--text-3xl)',  { lineHeight: '1.2' }],
        '4xl':  ['var(--text-4xl)',  { lineHeight: '1.15' }],
        '5xl':  ['var(--text-5xl)',  { lineHeight: '1.1' }],
        'hero': ['var(--text-hero)', { lineHeight: '1.05' }],
      },
      spacing: {
        '1':  'var(--space-1)',
        '2':  'var(--space-2)',
        '3':  'var(--space-3)',
        '4':  'var(--space-4)',
        '5':  'var(--space-5)',
        '6':  'var(--space-6)',
        '8':  'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      transitionTimingFunction: {
        'ease-spring': 'var(--ease-spring)',
        'ease-out':    'var(--ease-out)',
      },
      transitionDuration: {
        fast:   'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow:   'var(--duration-slow)',
      },
      maxWidth: {
        'container-sm':  'var(--container-sm)',
        'container-md':  'var(--container-md)',
        'container-lg':  'var(--container-lg)',
        'container-xl':  'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
      },
      zIndex: {
        nav:     'var(--z-nav)',
        modal:   'var(--z-modal)',
        overlay: 'var(--z-overlay)',
        toast:   'var(--z-toast)',
      },
      boxShadow: {
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        xl:   'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
};

export default config;
