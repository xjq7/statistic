import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const isBuild = env.command === 'build';
  return {
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {},
      },
    },
    server: {
      host: true,
    },
    build: {
      sourcemap: isBuild ? 'hidden' : false,
      rollupOptions: {
        plugins: [analyze({ summaryOnly: true, limit: 10 })],
      },
    },
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, './src/utils'),
        '@api': path.resolve(__dirname, './src/api'),
        '@components': path.resolve(__dirname, './src/components'),
        '@store': path.resolve(__dirname, './src/store'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@slices': path.resolve(__dirname, './src/slices'),
      },
    },
    plugins: [react()],
  };
});
