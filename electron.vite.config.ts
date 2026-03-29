import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

export default defineConfig({
  // ── Main process ──────────────────────────────────────────────
  main: {
    build: {
      outDir: 'dist-electron/main',
      lib: {
        entry: 'electron/main.ts',
        formats: ['cjs'],
        fileName: () => 'main.cjs'
      }
    }
  },

  // ── Preload script ────────────────────────────────────────────
  preload: {
    build: {
      outDir: 'dist-electron/preload',
      lib: {
        entry: 'electron/preload.ts',
        formats: ['cjs'],
        fileName: () => 'preload.cjs'
      }
    }
  },

  // ── Renderer (Vue app) ────────────────────────────────────────
  renderer: {
    root: '.',
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version)
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('appkit-')
          }
        }
      })
    ],

    // DEV: Fuji RPC Proxy (same-origin, vermeidet CORS)
    server: {
      proxy: {
        '/fuji': {
          target: 'https://api.avax-test.network',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/fuji/, '/ext/bc/C/rpc')
        }
      }
    },

    build: {
      outDir: 'dist-electron/renderer',
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        input: 'index.html',
        onwarn(warning, warn) {
          const msg = String((warning as any)?.message ?? '')
          if (
            (warning as any)?.code === 'INVALID_ANNOTATION' &&
            msg.includes('/*#__PURE__*/')
          ) {
            return
          }
          warn(warning)
        }
      }
    }
  }
})
