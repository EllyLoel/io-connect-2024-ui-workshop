import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "src/index.html"),
				nested: resolve(__dirname, "src/magic-kid/index.html"),
			},
		},
	},
});
