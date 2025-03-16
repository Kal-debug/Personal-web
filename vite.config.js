import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: "/Personal-web/", // this must matches repo
  plugins: [vue()],
})
