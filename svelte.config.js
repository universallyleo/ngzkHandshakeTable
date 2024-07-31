import adapter from "@sveltejs/adapter-static";

const dev = process.argv.includes("dev");

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            pages: "build",
            assets: "build",
        }),
        paths: {
            // change below to your repo name
            base: dev ? "" : "/ngzkHandshakeTable",
        },
        // hydrate the <div id="svelte"> element in src/app.html
        // needed to be remove from Sept 2022.
        // prerender: { default: true }
    },
};
export default config;
