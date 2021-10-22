import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
<<<<<<< HEAD
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), eslintPlugin()],
	build: { outDir: '../server/public' },
=======
import eslint from '@rollup/plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		{
			...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }),
			enforce: 'pre',
		},
		reactRefresh(),
	],
>>>>>>> frontend-reduxtoolkit
});
