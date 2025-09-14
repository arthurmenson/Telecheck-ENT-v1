import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Client-only Vite config for building the frontend
export default defineConfig(({ mode }) => ({
  // Ensure environment variables are properly defined
  define: {
    "import.meta.env.VITE_WS_URL": JSON.stringify(
      process.env.VITE_WS_URL || "ws://localhost:8080",
    ),
    "import.meta.env.MODE": JSON.stringify(mode),
    "import.meta.env.DEV": mode === "development",
    "import.meta.env.PROD": mode === "production",
  },
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      external: [
        // Exclude server-side dependencies from client build
        "sqlite3",
        "@tensorflow/tfjs-node",
        "canvas",
        "sharp",
        "jimp",
        "tesseract.js",
        "pdf-parse",
        "nodemailer",
        "node-schedule",
        "redis",
        "pg",
        "bcryptjs",
        "jsonwebtoken",
        "multer",
        "express",
        "helmet",
        "cors",
        "express-rate-limit",
        "express-validator",
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));
