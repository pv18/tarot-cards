import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

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
  resolve: {
    alias: [
      // rc-util@5.44.4 публикует main/module без расширения (.js),
      // из-за чего Vite не может резолвить entry пакета — указываем файл напрямую
      {
        find: /^rc-util$/,
        replacement: fileURLToPath(
          new URL('./node_modules/rc-util/es/index.js', import.meta.url)
        ),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
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
