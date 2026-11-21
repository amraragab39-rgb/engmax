/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        engmax: {
          brand: '#0099dd',
          brandDark: '#0077aa',
          brandHover: '#0088cc',
          bg: '#ffffff',
          bgSecondary: '#f5f7fa',
          surface: '#ffffff',
          text: '#1a1a1a',
          textSecondary: '#666666',
          textMuted: '#999999',
          border: '#e0e0e0',
          success: '#2ecc71',
          warning: '#f1c40f',
          error: '#e74c3c',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'engmax': '16px',
        'engmax-lg': '24px',
      },
      boxShadow: {
        'engmax': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
