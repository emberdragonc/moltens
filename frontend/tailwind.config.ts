import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Moltbook-inspired colors
        molt: {
          bg: '#0a0a0a',
          card: '#1a1a1b',
          border: '#333333',
          red: '#e01b24',
          'red-hover': '#ff3b3b',
          teal: '#00d4aa',
          text: '#ffffff',
          muted: '#888888',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
