import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public/assets',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'WebcraftersScoreboard',
      fileName: (format) => `score-board.${format}.js`
    },
  },
  plugins: [vue()]
})