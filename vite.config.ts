import { defineConfig } from 'vite'
import Alias from 'vite-tsconfig-paths'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'

import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Alias({ loose: true }),
    Vue({ reactivityTransform: true }),
    AutoImport({
      imports: ['vue', 'vue/macros', 'pinia', 'vue-router'],
      dts: 'src/types/auto-imports.d.ts',
      resolvers: [ArcoResolver()],
    }),
    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [ArcoResolver({ sideEffect: true })],
    }),
    Pages(),
    Layouts(),
    Unocss(),
    Inspect(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
})
