import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        libs: `${path.resolve(__dirname, "./src/libs/")}`,
        services: `${path.resolve(__dirname, "./src/services")}`,
        pages: `${path.resolve(__dirname, "./src/pages/")}`,
      }
    },
    server: {
      port: 3000,
      hmr: true
    }
})
