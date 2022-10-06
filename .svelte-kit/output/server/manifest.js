export const manifest = {
	appDir: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-b742ef48.js","imports":["_app/immutable/start-b742ef48.js","_app/immutable/chunks/index-1f84a181.js","_app/immutable/chunks/paths-b9644fda.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js')
		],
		routes: [
			{
				type: 'endpoint',
				id: "+layout.server",
				pattern: /^\/\+layout\.server$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/_layout.server.js')
			},
			{
				type: 'page',
				id: "+layout",
				pattern: /^\/\+layout\/?$/,
				names: [],
				types: [],
				path: "/+layout",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "+page",
				pattern: /^\/\+page\/?$/,
				names: [],
				types: [],
				path: "/+page",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "about/+page",
				pattern: /^\/about\/\+page\/?$/,
				names: [],
				types: [],
				path: "/about/+page",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "progress/+page",
				pattern: /^\/progress\/\+page\/?$/,
				names: [],
				types: [],
				path: "/progress/+page",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "progress/ProgressGraph",
				pattern: /^\/progress\/ProgressGraph\/?$/,
				names: [],
				types: [],
				path: "/progress/ProgressGraph",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "progress/ProgressTable",
				pattern: /^\/progress\/ProgressTable\/?$/,
				names: [],
				types: [],
				path: "/progress/ProgressTable",
				shadow: null,
				a: [0,7],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
