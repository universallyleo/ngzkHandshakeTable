import { c as create_ssr_component, e as escape } from "../../chunks/index.js";
import { b as base } from "../../chunks/shared.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: `:root{font-family:'メイリオ', "Meiryo", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic,\r
        'Noto Sans CJK', sans-serif, Arial, 'Open Sans', 'Helvetica Neue';--font-mono:'Fira Mono', monospace;--pure-white:#ffffff;--primary-color:#b9c6d2;--secondary-color:#d0dde9;--tertiary-color:#edf0f8;--accent-color:#444444;--heading-color:rgba(0, 0, 0, 0.7);--text-color:#444444}ul.svelte-mrj498{display:flex;list-style:none;padding-bottom:.8ch;margin-bottom:2ch;border-bottom:solid black 1px}li.svelte-mrj498{margin-right:15px}a.svelte-mrj498{color:#812990;text-decoration:none;vertical-align:baseline}a.svelte-mrj498:hover{text-decoration:underline}footer.svelte-mrj498{width:50%;margin:20px auto;display:block;justify-content:center;align-items:center;padding:40px;color:hsl(0, 0%, 65%)}`,
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav><ul class="${"svelte-mrj498"}"><li class="${"svelte-mrj498"}"><a href="${escape(base, true) + "/"}" class="${"svelte-mrj498"}">完売表</a></li>
        <li class="${"svelte-mrj498"}"><a href="${escape(base, true) + "/progress"}" class="${"svelte-mrj498"}">推移グラフ</a></li>
        <li class="${"svelte-mrj498"}"><a href="${escape(base, true) + "/about"}" class="${"svelte-mrj498"}">About</a></li></ul></nav>
${slots.default ? slots.default({}) : ``}


<footer class="${"svelte-mrj498"}">Author: <a href="${"https://github.com/universallyleo"}" class="${"svelte-mrj498"}">universallyleo</a>.  Soruce &amp; Manual: <a href="${"https://github.com/universallyleo/ngzkHandshakeTable"}" class="${"svelte-mrj498"}">Github</a>	
</footer>`;
});
export {
  Layout as default
};
