"use strict";
//サイトヘッダーを挿入する
fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
    const body = document.body;
    body.insertAdjacentHTML("afterbegin", data);
});
//headを挿入する（スタイルシート、CDNなど）
fetch("/components/head.html")
    .then(response => response.text())
    .then(data => {
    const head = document.head;
    head.insertAdjacentHTML("beforeend", data);
});
