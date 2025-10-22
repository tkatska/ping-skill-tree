// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
    plugins: [react(), tailwind()],
    test: {
        environment: 'jsdom', // gives window/document
        setupFiles: './tests/setup.ts', // jest-dom + polyfills
        globals: true,
        css: true,
    },
    resolve: {
        alias: {
            '@core': fileURLToPath(new URL('../../packages/core/src', import.meta.url)),
        },
    },
});
