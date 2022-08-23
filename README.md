# ngzkHandshakeTable
 Display handshake/meet-and-greet sales of each Nogizaka46 CD in a reasonably good-looking table.

-[完売表の見方 (JP)](https://ameblo.jp/seto-kasumi/entry-11695182533.html) 
-[完売表の見方 (ZH-TW)](https://pttyes.com/SakaTalk/M.1648729058.A.59E) 

# データ源
- [乃木坂46公式サイト](nogizaka46.com) - メンバー情報
- [乃木坂46・欅坂46握手会情報まとめ](https://ameblo.jp/seto-kasumi/) ー 完売情報
- [ツイーターユーザー ✝︎ジ〜ン✝︎](https://twitter.com/lovefiaa) ー 完売情報
- Scraped from [ngzkHandshakeScrape](https://github.com/universallyleo/ngzkHandshakeScrape) since 30th Single ３次受付

# Acknowledgement
- この完売表は [✝︎ジ〜ン✝︎](https://twitter.com/lovefiaa) のをもとにしてデザインしたものです。


# TODO
- Add 曜日 and 握手会会場 info
- New table (or graph): Sales progression, and accumulated sales numebr
- Rewrite using class so functions related to individual member's data become methods
- Finish recording all old data (current earliest: 22nd Single)

# Note about chart.js

Opposed to many tutorial site on using chart.js with svelte, the usual loading method (`import Chart from 'chartjs/auto/auto.js'`) is outdated.  It somehow worked in `dev` stage but not in the deployed version.  The correct way is to replace `auto.js` by `auto.mjs`.