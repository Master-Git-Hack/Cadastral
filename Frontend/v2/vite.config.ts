import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import million from "million/compiler";
import pluginRewriteAll from '@evg3/vite-plugin-rewrite-all';



export default defineConfig({
  plugins: [pluginRewriteAll(),million.vite({ auto: true }), react()],
  base: "/",

  preview: {
    host:true,
    port: 80,
    
  },
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
      "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
      "@redux-api":path.resolve(__dirname, "./src/store/api"),
      
    },
  },
})
