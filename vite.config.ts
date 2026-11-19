import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
