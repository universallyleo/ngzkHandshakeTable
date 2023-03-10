import { c as create_ssr_component, f as each, h as add_attribute, e as escape, v as validate_component } from "../../../chunks/index.js";
const YearMonthSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { from = "2014" } = $$props;
  let { date } = $$props;
  let year;
  let month;
  let years = [new Date().getFullYear()];
  let y = years[0] - 1;
  while (y >= parseInt(from)) {
    years.push(y);
    y--;
  }
  if ($$props.from === void 0 && $$bindings.from && from !== void 0)
    $$bindings.from(from);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  date = `${year}${month}`;
  return `<select name="${"year"}">${each(years, (yr) => {
    return `<option${add_attribute("value", yr, 0)}>${escape(yr)}</option>`;
  })}</select>
<select name="${"month"}"><option value="${"01"}">1</option><option value="${"02"}">2</option><option value="${"03"}">3</option><option value="${"04"}">4</option><option value="${"05"}">5</option><option value="${"06"}">6</option><option value="${"07"}">7</option><option value="${"08"}">8</option><option value="${"09"}">9</option><option value="${"10"}">10</option><option value="${"11"}">11</option><option value="${"12"}">12</option></select>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-7pelpo{margin-bottom:2px}ul.svelte-7pelpo{margin-top:2px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let date;
  let datem;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div style="${"margin-left: 1em;"}"><ul class="${"svelte-7pelpo"}"><li>\u5B8C\u58F2\u8868\u306F<a href="${"https://twitter.com/lovefiaa"}">\u271D\uFE0E\u30B8\u301C\u30F3\u271D\uFE0E</a>\u306E\u3092\u3082\u3068\u306B\u3057\u3066\u30C7\u30B6\u30A4\u30F3\u3057\u305F\u3082\u306E\u3067\u3059\u3002</li>
        <li>\u6587\u6CD5\u306E\u6307\u6458\u3084UI\u6539\u5584\u306B\u95A2\u3059\u308B\u3054\u63D0\u6848\u304C\u3042\u308A\u307E\u3057\u305F\u3089\u3001\u662F\u975E\u3054\u9023\u7D61\u304F\u3060\u3055\u3044\u3002</li></ul>

    <h2 class="${"svelte-7pelpo"}">\u66F4\u65B0\u306B\u3064\u3044\u3066</h2>
    <ul class="${"svelte-7pelpo"}"><li>\u57FA\u672C\u306F\u65E5\u672C\u6642\u9593\u6BCE\u9031\u6728\u66DC14\u66423\u5206\u304B\u3089\u81EA\u52D5\u66F4\u65B0\u3055\u308C\u307E\u3059\u3002</li>
        <li>GitHub Action\u306F\u9045\u5EF6\u304C\u3042\u308B\u306E\u3067\u3001\u66F4\u65B0\u3092\u30B5\u30A4\u30C8\u3067\u53CD\u6620\u3055\u308C\u308B\u306E\u306F14\u664230~40\u5206\u9803\u3067\u3059\u3002</li></ul>

    <h2 class="${"svelte-7pelpo"}">\u5B8C\u58F2\u8868\u306E\u898B\u65B9</h2>
    <ul class="${"svelte-7pelpo"}"><li><a href="${"https://ameblo.jp/seto-kasumi/entry-11695182533.html"}">\u65E5\u672C\u8A9E</a></li>
        <li><a href="${"https://pttyes.com/SakaTalk/M.1648729058.A.59E"}">ZH-TW</a></li>
        <li>Other languages: please tell me</li></ul>
    
    <h2 class="${"svelte-7pelpo"}">\u30C7\u30FC\u30BF\u6E90</h2>
    <ul class="${"svelte-7pelpo"}"><li>\u30E1\u30F3\u30D0\u30FC\u60C5\u5831: <a href="${"https://nogizaka46.com/"}">\u4E43\u6728\u574246\u516C\u5F0F\u30B5\u30A4\u30C8</a></li>
        <li>\u5B8C\u58F2\u60C5\u5831: <a href="${"https://ameblo.jp/seto-kasumi/"}">\u4E43\u6728\u574246\u30FB\u6B05\u574246\u63E1\u624B\u4F1A\u60C5\u5831\u307E\u3068\u3081</a></li>
        <li>\u5B8C\u58F2\u60C5\u5831: <a href="${"https://twitter.com/lovefiaa"}">\u30C4\u30A4\u30FC\u30BF\u30FC\u30E6\u30FC\u30B6\u30FC \u271D\uFE0E\u30B8\u301C\u30F3\u271D\uFE0E</a></li>
        <li>\u5B8C\u58F2\u60C5\u5831: <a href="${"https://github.com/universallyleo/ngzkHandshakeScrape/"}">ngzkHandshakeScrape</a> ([\u81EA\u4F5C]\u5B8C\u58F2\u60C5\u5831\u30B9\u30AF\u30EC\u30A4\u30D4\u30F3\u30B0\u534A\u81EA\u52D5Python\u30B9\u30AF\u30EA\u30D7\u30C8)</li>
        <li>\u88DC\u5B8C\u72B6\u6CC1: (2022-08-24\u73FE\u5728) 3\u671F\u751F\u304C\u63E1\u624B\u4F1A\u53C2\u52A0\u3059\u308B\u304B\u3089\u300117\u679A\u76EE\u30B7\u30F3\u30B0\u30EB\u307E\u3067\u5B8C\u4E86\u3002</li></ul>
    
    <h2 class="${"svelte-7pelpo"}">\u304A\u3059\u3059\u3081\u30B5\u30A4\u30C8</h2>
    <ul class="${"svelte-7pelpo"}"><li><a href="${"https://nogilib.com/"}">NOGILIB</a></li>
        <li><a href="${"https://aknog.github.io/srdata/"}">SHOWROOM\u30C7\u30FC\u30BF</a></li> 
        <li>\u30E2\u30D0\u30E1\u30FB\u30E1\u30C3\u30BB\u30FC\u30B8\u96C6\u8A08 ( YYYY = \u5E74, MM = \u6708 )
            <ul class="${"svelte-7pelpo"}"><li style="${"margin-bottom:1ch;"}">\u6587\u3001\u5199\u771F (201402~): http://nogimbm.s2.xrea.com/YYYYMM.html 
                    <br>
                    \xA0\xA0\u81EA\u52D5\u751F\u6210\uFF1A\xA0
                    ${validate_component(YearMonthSelect, "YearMonthSelect").$$render(
      $$result,
      { date },
      {
        date: ($$value) => {
          date = $$value;
          $$settled = false;
        }
      },
      {}
    )}
                    <button>Copy link to clipboard</button></li>
                <li>\u97F3\u58F0\u7740\u4FE1\u3001\u52D5\u753B (202202~): http://nogimbm.s2.xrea.com/YYYYMMm.html
                    <br>
                    \xA0\xA0\u81EA\u52D5\u751F\u6210\uFF1A\xA0
                    ${validate_component(YearMonthSelect, "YearMonthSelect").$$render(
      $$result,
      { from: "2022", date: datem },
      {
        date: ($$value) => {
          datem = $$value;
          $$settled = false;
        }
      },
      {}
    )}
                    <button>Copy link to clipboard</button></li></ul></li></ul>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
