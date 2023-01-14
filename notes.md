# Upgrade SvelteKit

As of mid-September, SvelteKit has a few breaking changes.  I needed to do the following.

1.  Download latest version of npm and (re)install
2.  I tried running `npm update` at cwd, but run into error:  `config.kit.prerender.default has been removed.`, which directs me to https://github.com/sveltejs/kit/pull/6197.
3.  It says that I need to remove `prerender: {default: true}`  from my svelte.config.js, and instead uses `export const prerender=true;` in my `+layout.js`
4.  Following the instruction, now I have a new +layout.js file in my routes folder.  Then running `npm update` seems fine.
5.  Check sveltejs/kit version is correct from package-lock.json
6.  Running `npm run dev` and opening the page an error about add data prop is thrown, since I do not use `load` function in this webapp, I just need to remove the forced error added to my `page.svelte`. 
7.  Everything seems to work fine now.

# Screenshot API

https://shot.screenshotapi.net/screenshot?token=CDV7WJD-74KMZF6-P6ZX0VC-WEPV9VS&url=https%3A%2F%2Funiversallyleo.github.io%2FngzkHandshakeTable%2F&fresh=true&output=image&file_type=png&wait_for_event=domcontentloaded&selector=div.container