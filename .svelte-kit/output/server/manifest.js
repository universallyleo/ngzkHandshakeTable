export const manifest = {
	appDir: "_app",
	appPath: "ngzkHandshakeTable/_app",
	assets: new Set([".nojekyll","favicon_32x32.png","screenshot.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-16943c3e.js","imports":["_app/immutable/start-16943c3e.js","_app/immutable/chunks/index-ab941ede.js","_app/immutable/chunks/singletons-54b0b033.js","_app/immutable/chunks/shared-23917130.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
