import { c as create_ssr_component, e as escape } from "../../_app/immutable/chunks/index-16508633.js";
import { b as base } from "../../_app/immutable/chunks/paths-b9644fda.js";
const __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: `:root{font-family:'\u30E1\u30A4\u30EA\u30AA', "Meiryo", "\u30D2\u30E9\u30AE\u30CE\u89D2\u30B4 Pro", "Hiragino Kaku Gothic Pro", "\u6E38\u30B4\u30B7\u30C3\u30AF\u4F53", "Yu Gothic", YuGothic,\r
        'Noto Sans CJK', sans-serif, Arial, 'Open Sans', 'Helvetica Neue';--font-mono:'Fira Mono', monospace;--pure-white:#ffffff;--primary-color:#b9c6d2;--secondary-color:#d0dde9;--tertiary-color:#edf0f8;--accent-color:#444444;--heading-color:rgba(0, 0, 0, 0.7);--text-color:#444444}ul.svelte-mrj498{display:flex;list-style:none;padding-bottom:.8ch;margin-bottom:2ch;border-bottom:solid black 1px}li.svelte-mrj498{margin-right:15px}a.svelte-mrj498{color:#812990;text-decoration:none;vertical-align:baseline}a.svelte-mrj498:hover{text-decoration:underline}footer.svelte-mrj498{width:50%;margin:20px auto;display:block;justify-content:center;align-items:center;padding:40px;color:hsl(0, 0%, 65%)}`,
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav><ul class="${"svelte-mrj498"}"><li class="${"svelte-mrj498"}"><a href="${escape(base, true) + "/"}" class="${"svelte-mrj498"}">\u5B8C\u58F2\u8868</a></li>
        <li class="${"svelte-mrj498"}"><a href="${escape(base, true) + "/progress"}" class="${"svelte-mrj498"}">\u63A8\u79FB\u30B0\u30E9\u30D5</a></li>
        <li class="${"svelte-mrj498"}"><a href="${escape(base, true) + "/about"}" class="${"svelte-mrj498"}">About</a></li></ul></nav>
${slots.default ? slots.default({}) : ``}


<footer class="${"svelte-mrj498"}">Author: <a href="${"https://github.com/universallyleo"}" class="${"svelte-mrj498"}">universallyleo</a>.  Soruce &amp; Manual: <a href="${"https://github.com/universallyleo/ngzkHandshakeTable"}" class="${"svelte-mrj498"}">Github</a>	
</footer>`;
});
export {
  _layout as default
};
