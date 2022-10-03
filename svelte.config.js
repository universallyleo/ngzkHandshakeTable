import adapter from '@sveltejs/adapter-auto';
// static deploy: "@sveltejs/adapter-static"

// need the following to GitHub static deploy
//const dev = process.env.NODE_ENV === 'development';

/** @type {import(""@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter()
		//Need the following for github static deploy
		// adapter: adapter({
		// 	pages: 'docs',
		// 	assets: 'docs'
		// }),
		// paths: {
		// 	// change below to your repo name
		// 	base: dev ? '' : '/ngzkHandshakeTable'
		// }
	}
};

export default config;
