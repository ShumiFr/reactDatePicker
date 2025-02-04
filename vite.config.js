import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.js"),
      name: "ReactDatePicker",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "moment",
        "@fortawesome/react-fontawesome",
        "@fortawesome/free-solid-svg-icons",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          moment: "moment",
          "@fortawesome/react-fontawesome": "FontAwesome",
          "@fortawesome/free-solid-svg-icons": "FontAwesomeIcons",
        },
      },
    },
  },
});
