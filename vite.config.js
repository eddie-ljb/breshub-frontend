import { defineConfig } from 'vite'
import ViteStaticCopy from 'vite-plugin-static-copy';

export default defineConfig({
    server: {
        allowedHosts: ['.etiennebader.de']
    },
    build: {
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name].[ext]',
          },
        },
      },
      resolve: {
        alias: {
          '@': '/src',
        },
      },
      plugins: [
        ViteStaticCopy({
          targets: [
            {
              src: 'node_modules/primeicons/fonts/*',
              dest: 'fonts',
            },
          ],
        }),
      ],
})