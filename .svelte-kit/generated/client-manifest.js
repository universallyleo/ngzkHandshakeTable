export { matchers } from './client-matchers.js';

export const components = [
	() => import("..\\runtime\\components\\layout.svelte"),
	() => import("..\\runtime\\components\\error.svelte"),
	() => import("..\\..\\src\\routes\\+layout.svelte"),
	() => import("..\\..\\src\\routes\\+page.svelte"),
	() => import("..\\..\\src\\routes\\about\\+page.svelte"),
	() => import("..\\..\\src\\routes\\progress\\+page.svelte"),
	() => import("..\\..\\src\\routes\\progress\\ProgressGraph.svelte"),
	() => import("..\\..\\src\\routes\\progress\\ProgressTable.svelte")
];

export const dictionary = {
	"+layout": [[0, 2], [1]],
	"+page": [[0, 3], [1]],
	"about/+page": [[0, 4], [1]],
	"progress/+page": [[0, 5], [1]],
	"progress/ProgressGraph": [[0, 6], [1]],
	"progress/ProgressTable": [[0, 7], [1]]
};