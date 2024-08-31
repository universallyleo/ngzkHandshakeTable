<script>
    import { base } from "$app/paths";
    // needing to prepend base path is adapter-static problem
    // c.f. https://github.com/sveltejs/kit/issues/4528
</script>

<nav>
    <ul>
        <li><a href="{base}/">🤝完売表（個別）</a></li>
        <li><a href="{base}/zenaku">🗾完売表（全国）</a></li>
        <li><a href="{base}/progress">📈完売推移</a></li>
        <li><a href="{base}/miscData">💿売上データ</a></li>
        <li><a href="{base}/bday">🎉学年・身長・コール</a></li>
        <li><a href="{base}/about">ℹ️About</a></li>
    </ul>
</nav>
<slot />

<footer>
    Author: <a href="https://github.com/universallyleo">universallyleo</a>.
    Soruce:
    <a href="https://github.com/universallyleo/ngzkHandshakeTable">Github</a>
</footer>

<style>
    :root {
        font-family: "メイリオ", "Meiryo", "ヒラギノ角ゴ Pro",
            "Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic,
            "Noto Sans CJK", sans-serif, Arial, "Open Sans", "Helvetica Neue";
        --font-mono: "Fira Mono", monospace;
        --pure-white: #ffffff;
        --primary-color: #b9c6d2;
        --secondary-color: #d0dde9;
        --tertiary-color: #edf0f8;
        --accent-color: #444444;
        --heading-color: rgba(0, 0, 0, 0.7);
        --text-color: #444444;
    }
    nav {
        width: max-content;
    }
    ul {
        display: flex;
        list-style: none;
        padding-bottom: 0.8ch;
        margin-bottom: 2ch;
        border-bottom: solid black 1px;
    }
    li {
        margin-right: 20px;
    }

    a {
        color: #812990;
        text-decoration: none;
        vertical-align: baseline;
    }

    a:hover {
        text-decoration: underline;
    }

    footer {
        /* border: 1px solid black; */
        font-size: smaller;
        text-align: center;
        width: 50%;
        margin: 20px auto;
        display: block;
        justify-content: center;
        align-items: center;
        /* padding: 40px; */
        color: hsl(0, 0%, 65%);
    }
</style>
