import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const uploadedDir = 'C:/Users/SantiTuHermana/.gemini/antigravity/brain/511d0bf9-79e5-44d7-83da-20e4b4714b50/.user_uploaded'
const imageMap = {
  'berserk.jpg': 'media_1794605931621_2a973b0f.jpg',
  'nier-automata.jpg': 'media_1794605931646_8463cc43.jpg',
  'cyberpunk-edgerunners.jpg': 'media_1794605931630_0ed42c48.jpg',
  'persona3-reload.webp': 'media_1794605931632_025a34d6.webp',
  'stellar-blade.webp': 'media_1794605931634_34f00b37.webp',
  'one-last-kiss.jpg': 'media_1794605964279_fb793366.jpg',
  'house-of-balloons.jpg': 'media_1794606003823_19ea1412.jpg',
  'thursday.jpg': 'media_1794606014203_c79bfbdf.jpg',
  'echoes-of-silence.png': 'media_1794606024083_4d4118f8.png',
  'after-hours.png': 'media_1794606031979_350007e4.png',
  'dawn-fm.jpg': 'media_1794606056769_5c01a7e7.jpg',
  'hurry-up-tomorrow.jpg': 'media_1794606065206_48bcfb13.jpg'
}

function syncVinylImagesPlugin() {
  return {
    name: 'sync-vinyl-images',
    buildStart() {
      try {
        const targetDir = path.resolve(process.cwd(), 'public/images')
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
        }
        for (const [targetName, sourceName] of Object.entries(imageMap)) {
          const srcPath = path.join(uploadedDir, sourceName)
          const destPath = path.join(targetDir, targetName)
          if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
            fs.copyFileSync(srcPath, destPath)
          }
        }
      } catch (err) {
        console.warn('No se pudieron copiar imágenes automáticamente:', err.message)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), syncVinylImagesPlugin()],
  server: {
    port: 5173
  }
})
