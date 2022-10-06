import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-feaeb4ae.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-feaeb4ae.js","_app/immutable/chunks/index-206563de.js","_app/immutable/chunks/paths-6cd3a76e.js"];
export const stylesheets = ["_app/immutable/assets/_layout-a9419390.css"];
