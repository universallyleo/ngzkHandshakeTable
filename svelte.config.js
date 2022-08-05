import adapter from '@sveltejs/adapter-static';
// was "@sveltejs/adapter-auto"

const dev = process.env.NODE_ENV === 'development';

/** @type {import(""@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			// change below to your repo name
			base: dev ? '' : '/ngzkHandshakeTable'
		},
		// hydrate the <div id="svelte"> element in src/app.html
		prerender: { default: true }
	}
};

export default config;
