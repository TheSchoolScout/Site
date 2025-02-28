import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import "dotenv/config";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
	server: {
		allowedHosts: [
			process.env.DEV_SERVER_HOST || ""
		]
	}
});
