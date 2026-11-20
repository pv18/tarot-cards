import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Таро — карта дня и расклады',
        short_name: 'Таро',
        description:
          'Карта дня с толкованием, расклады «Три карты» и «Пять карт», все 78 арканов.',
        lang: 'ru',
        theme_color: '#14101c',
        background_color: '#0f0b14',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // вся колода весит ~2,5 МБ — пре-кэшим целиком ради полного офлайна
        globPatterns: ['**/*.{js,css,html,jpg,png,svg,woff,woff2}'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    // globals нужны Testing Library для автоматической очистки между тестами
    globals: true,
  },
});
