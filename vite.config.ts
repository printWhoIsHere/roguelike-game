import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@ui': path.resolve(__dirname, 'src/ui'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@assets': path.resolve(__dirname, 'public/assets'),
		},
	},
})
