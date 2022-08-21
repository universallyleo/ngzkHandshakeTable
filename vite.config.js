import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	vite: {
		ssr: { noExternal: ['chart.js/**'] }
	}
};

export default config;
