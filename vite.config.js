import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function serveExternalProjects() {
  return {
    name: 'serve-external-projects',
    configureServer(server) {
      const app = express()
      // Mount static folders globally on the Vite Dev Server
      app.use('/vincenzosite', express.static(path.resolve(__dirname, '../../vincenzosite')))
      app.use('/AULA F75 ANTIGRAVITY', express.static(path.resolve(__dirname, '../AULA F75 ANTIGRAVITY')))
      server.middlewares.use(app)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss(), serveExternalProjects()],
})

