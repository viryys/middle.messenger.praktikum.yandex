import Handlebars from "handlebars";

const tpl = `
    <img src="/img/main.png" alt="Страница Чата" />

`

const root = document.querySelector("#root")

const template = Handlebars.compile(tpl);

const data = {};

root.innerHTML = template(data)
