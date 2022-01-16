import Handlebars from "handlebars";
import styles from "./signin.css"

const tpl = `
<div class=${styles.wrapper}>
    <h2 class=${styles.heading}>Вход</h2>
    <div class=${styles.inputGroup}>
        <label for="login">Логин</label>
        <input type="text" placeholder="Ввведите логин" id="login" name="login">
    </div>
    <div class=${styles.inputGroup}>
        <label for="password">Пароль</label>
        <input type="password" placeholder="Ввведите пароль" id="password" name="password">
    </div>
    <a href="/main.html" class=${styles.button}>Войти</a>
    <a href="/signup.html" class=${styles.link}>Нет аккаунта?</a>
</div>
`

const root = document.querySelector("#root")

const template = Handlebars.compile(tpl);

const data = {};

root.innerHTML = template(data)
