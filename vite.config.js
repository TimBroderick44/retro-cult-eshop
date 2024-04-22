import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/retro-cult-eshop/", // Set the base to match the GitHub Pages URL suffix
    plugins: [react()],
});
