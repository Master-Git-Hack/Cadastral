import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/store/api"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/lib/utils"),
      "@types": path.resolve(__dirname, "./src/lib/types"),
      "@context": path.resolve(__dirname, "./src/lib/context"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@redux": path.resolve(__dirname, "./src/store"),
      "@actions": path.resolve(__dirname, "./src/store/actions"),
      "@reducers": path.resolve(__dirname, "./src/store/reducers"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@redux-api":path.resolve(__dirname, "./src/store/api")
    },
  },
})
