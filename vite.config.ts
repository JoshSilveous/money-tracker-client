import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	server: {
		port: 3001,
		host: true,
	},
	build: {
		outDir: './build',
	},
})
