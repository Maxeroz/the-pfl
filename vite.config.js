import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    visualizer({
      // Настройки для плагина
      filename: "bundle-stats.html", // Имя файла отчета
      title: "Bundle Analysis", // Заголовок отчета
      gzipSize: true, // Включить отображение сжатого размера
      open: true, // Автоматически открыть отчет в браузере
    }),
  ],
  resolve: {
    alias: { "@mui/styled-engine": "@mui/styled-engine-sc" },
  },
});
