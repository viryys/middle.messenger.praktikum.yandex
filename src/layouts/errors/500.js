import Handlebars from "handlebars";
import styles from "./errors.css"

const tpl = `
    <div>
        <h2 class=${styles.title}>500</h2>
        <p class=${styles.description}>Что-то пошло не так</p>
        <a class=${styles.link} href="/index.html">Назад к чатам</a>
    </div> 
`

const root = document.querySelector("#root")

const template = Handlebars.compile(tpl);

const data = {};

root.innerHTML = template(data)
