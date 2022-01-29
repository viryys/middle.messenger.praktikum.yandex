import mainTemplate from "./main.hbs";

const root = document.querySelector("#root")

const data = {};

root.innerHTML = mainTemplate(data)
