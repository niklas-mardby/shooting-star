import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Ladda miljövariabler från .env-fil baserat på mode (development/production)
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		server: {
			proxy: {
				"/api": {
					target: `https://comicvine.gamespot.com/api/search/?api_key=${env.COMIC_API_KEY}&format=json&query=`,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
			cors: true,
		},
	};
});
