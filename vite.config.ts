import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/models': resolve(__dirname, 'src/models'),
      '@/controllers': resolve(__dirname, 'src/controllers'),
      '@/services': resolve(__dirname, 'src/services'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/styles': resolve(__dirname, 'src/styles'),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion']
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    target: 'esnext',
    sourcemap: false,
    minify: 'terser', // Use terser for better compression
    cssMinify: true,
    copyPublicDir: true,
  },
  // Image optimization settings
  assetsInclude: ['**/*.webp', '**/*.avif'],
  // Development server configuration
  server: {
    port: 5174,
    host: true,
    strictPort: true,
    cors: true,
    hmr: {
      port: 5174,
      host: 'localhost'
    }
  },
  // Preview server configuration for production builds
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
    cors: true
  }
})
