import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-4df8bb7e.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-4df8bb7e.js","_app/immutable/chunks/index-ab941ede.js","_app/immutable/chunks/shared-23917130.js"];
export const stylesheets = ["_app/immutable/assets/_layout-a9419390.css"];
export const fonts = [];
