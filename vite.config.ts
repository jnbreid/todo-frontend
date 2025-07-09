import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    vue(), 
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/primevue/resources/themes/saga-blue/theme.css',
          dest: 'themes/saga-blue'
        },
        {
          src: 'node_modules/primevue/resources/themes/vela-blue/theme.css',
          dest: 'themes/vela-blue'
        }
      ]
    })
  ],
})
