export { matchers } from './client-matchers.js';

export const components = [
	() => import("..\\runtime\\components\\layout.svelte"),
	() => import("..\\runtime\\components\\error.svelte"),
	() => import("..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\src\\routes\\progress.svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"progress": [[0, 3], [1]]
};