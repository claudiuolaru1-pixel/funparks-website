/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        bg: '#070810',
        surface: '#0F1020',
        card: '#141628',
        border: '#1E2240',
        accent: '#FF5C1A',
        'accent-2': '#00E0B8',
        muted: '#6B7299',
        light: '#E8EAFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,92,26,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
