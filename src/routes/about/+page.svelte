<script>
    import YearMonthSelect from "./YearMonthSelect.svelte";
    let date;
    let datem;

    function genLink(indate, opt = "") {
        let txt = "http://nogimbm.s2.xrea.com/" + indate + opt + ".html";
        navigator.clipboard.writeText(txt);
    }
</script>

<div style="margin-left: 1em;">
    <ul>
        <li>
            完売表は<a href="https://twitter.com/lovefiaa">✝︎ジ〜ン✝︎</a
            >のをもとにしてデザインしたものです。
        </li>
        <li>
            文法の指摘やUI改善に関するご提案がありましたら、是非ご連絡ください。
        </li>
    </ul>

    <h2>更新について</h2>
    <ul>
        <li>基本は日本時間毎週木曜14時3分から自動更新されます。</li>
        <li>
            GitHub
            Actionは遅延があるので、更新をサイトで反映されるのは14時30~40分頃です。
        </li>
    </ul>

    <h2>完売表の見方</h2>
    <ul>
        <li>
            <a href="https://ameblo.jp/seto-kasumi/entry-11695182533.html"
                >日本語</a
            >
        </li>
        <li>
            <a href="https://pttyes.com/SakaTalk/M.1648729058.A.59E">ZH-TW</a>
        </li>
        <li>Other languages: please tell me</li>
    </ul>

    <h2>データ源</h2>
    <ul>
        <li>
            メンバー情報: <a href="https://nogizaka46.com/"
                >乃木坂46公式サイト</a
            >
        </li>
        <li>
            完売情報: <a href="https://ameblo.jp/seto-kasumi/"
                >乃木坂46・欅坂46握手会情報まとめ</a
            >
        </li>
        <li>
            完売情報: <a href="https://twitter.com/lovefiaa"
                >ツイーターユーザー ✝︎ジ〜ン✝︎</a
            >
        </li>
        <li>
            完売情報: <a
                href="https://github.com/universallyleo/ngzkHandshakeTable/blob/main/scrape.py"
                >[自作]完売情報Pythonスクレイパー</a
            >
        </li>
        <li>
            補完状況: (2022-08-24現在)
            3期生が握手会参加以来（17枚目シングル）完了。
        </li>
    </ul>

    <h2>おすすめサイト</h2>
    <ul>
        <li><a href="https://nogilib.vercel.app/">NOGILIB</a></li>
        <li><a href="https://aknog.github.io/srdata/">SHOWROOMデータ</a></li>
        <li>
            <a href="https://blog.goo.ne.jp/kafka2002"
                >Billboard JAPAN Hot100 データ, MV再生回数, など</a
            >
        </li>
        <li>
            <a href="https://archive.sakamichi.co/">Sakamichi Blog Archive</a>
        </li>
        <li><a href="https://www.oricon.co.jp/rank/">oriconランキング</a></li>
        <li>
            <a href="https://www.billboard-japan.com/charts/"
                >billboard Japan Charts</a
            >
        </li>
        <li>
            モバメ・メッセージ集計 ( YYYY = 年, MM = 月 )
            <ul>
                <li style="margin-bottom:1ch;">
                    文、写真 (201402~): http://nogimbm.s2.xrea.com/YYYYMM.html
                    <br />
                    &nbsp;&nbsp;自動生成：&nbsp;
                    <YearMonthSelect bind:date />
                    <button on:click={genLink(date)}
                        >Copy link to clipboard</button
                    >
                </li>
                <li>
                    音声着信、動画 (202202~):
                    http://nogimbm.s2.xrea.com/YYYYMMm.html
                    <br />
                    &nbsp;&nbsp;自動生成：&nbsp;
                    <YearMonthSelect from="2022" bind:date={datem} />
                    <button on:click={genLink(datem, "m")}
                        >Copy link to clipboard</button
                    >
                </li>
            </ul>
        </li>
    </ul>
</div>

<style>
    h2 {
        margin-bottom: 2px;
    }

    ul {
        margin-top: 2px;
    }
</style>
