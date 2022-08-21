<script>
import { base } from '$app/paths';
</script>

<nav>
    <ul>
        <li><a href="{base}/">完売表</a></li>
        <li><a href="{base}/progress">推移グラフ</a></li>
        <!-- <li><a href="/about">About</a></li> -->
    </ul>
</nav>
<slot></slot>


<footer>
    Author: <a href="https://github.com/universallyleo">universallyleo</a>.  Soruce &#38; Manual: <a href="https://github.com/universallyleo/ngzkHandshakeTable">Github</a>	
</footer>

<style>
:root {
    font-family: 'メイリオ', "Meiryo", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic,
        'Noto Sans CJK', sans-serif, Arial, 'Open Sans', 'Helvetica Neue';
    --font-mono: 'Fira Mono', monospace;
    --pure-white: #ffffff;
    --primary-color: #b9c6d2;
    --secondary-color: #d0dde9;
    --tertiary-color: #edf0f8;
    --accent-color: #444444;
    --heading-color: rgba(0, 0, 0, 0.7);
    --text-color: #444444;
}
ul{
    display: flex;
    list-style: none;
    padding-bottom: .8ch;
    margin-bottom: 2ch;
    border-bottom: solid black 1px;
}
li{
    margin-right: 15px;
}


a {
    color: #812990;
    text-decoration: none;
    vertical-align: baseline;
}

a:hover {
    text-decoration: underline;
}

footer{
    width:20%;
    margin: 20px auto;
    display: block;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: hsl(0, 0%, 65%);
}
</style>