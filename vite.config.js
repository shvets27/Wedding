import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'

// Плагин для обслуживания статических файлов из корня в dev режиме
function staticFilesPlugin() {
  return {
    name: 'static-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Проверяем запросы к изображениям
        if (req.url.match(/\.(jpg|jpeg|png|gif|JPG|PNG)$/)) {
          const filePath = path.join(process.cwd(), req.url)
          if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath)
            const ext = path.extname(filePath).toLowerCase()
            const contentType = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif'
            }[ext] || 'image/jpeg'
            
            res.setHeader('Content-Type', contentType)
            res.end(file)
            return
          }
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    staticFilesPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3001,
    open: true
  },
  // Статические файлы (изображения) в папке public
  publicDir: 'public'
})

