import { c as create_ssr_component } from "../../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-7pelpo{margin-bottom:2px}ul.svelte-7pelpo{margin-top:2px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div style="${"margin-left: 1em;"}"><h2 class="${"svelte-7pelpo"}">完売表の見方</h2>
    <ul class="${"svelte-7pelpo"}"><li><a href="${"https://ameblo.jp/seto-kasumi/entry-11695182533.html"}">日本語</a></li>
        <li><a href="${"https://pttyes.com/SakaTalk/M.1648729058.A.59E"}">ZH-TW</a></li>
        <li>Other languages: please tell me</li></ul>
    
    <h2 class="${"svelte-7pelpo"}">データ源</h2>
    <ul class="${"svelte-7pelpo"}"><li>メンバー情報: <a href="${"https://nogizaka46.com/"}">乃木坂46公式サイト</a></li>
        <li>完売情報: <a href="${"https://ameblo.jp/seto-kasumi/"}">乃木坂46・欅坂46握手会情報まとめ</a></li>
        <li>完売情報: <a href="${"https://twitter.com/lovefiaa"}">ツイーターユーザー ✝︎ジ〜ン✝︎</a></li>
        <li>完売情報: <a href="${"https://github.com/universallyleo/ngzkHandshakeScrape/"}">ngzkHandshakeScrape</a> ([自作]完売情報スクレイピング半自動Pythonスクリプト)</li>
        <li>補完状況: (2022-08-24現在) 3期生が握手会参加するから、17枚目シングルまで完了。</li></ul>
    
    <h2 class="${"svelte-7pelpo"}">その他</h2>
    <ul class="${"svelte-7pelpo"}"><li>完売表は<a href="${"https://twitter.com/lovefiaa"}">✝︎ジ〜ン✝︎</a>のをもとにしてデザインしたものです。</li>
        <li>文法の指摘やUI改善に関するご提案がありましたら、是非ご連絡ください。</li></ul>
</div>`;
});
export {
  Page as default
};
