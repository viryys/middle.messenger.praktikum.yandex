import Handlebars from "handlebars";
import styles from "../signin/signin.css"

const tpl = `
<div class=${styles.wrapper}>
    <h2 class=${styles.heading}>Вход</h2>
    <div class=${styles.inputGroup}>
        <label for="email">Почта</label>
        <input type="email" placeholder="Ввведите адрес почты" id="email" name="email">
    </div>
    <div class=${styles.inputGroup}>
        <label for="login">Логин</label>
        <input type="text" placeholder="Ввведите логин" id="login" name="login">
    </div>
    <div class=${styles.inputGroup}>
        <label for="first_name">Имя</label>
        <input type="text" placeholder="Ввведите имя" id="first_name" name="first_name">
    </div>
    <div class=${styles.inputGroup}>
        <label for="second_name">Фамилия</label>
        <input type="text" placeholder="Ввведите фамилию" id="second_name" name="second_name">
    </div>
    <div class=${styles.inputGroup}>
        <label for="phone">Телефон</label>
        <input type="text" placeholder="Ввведите телефон" id="phone" name="phone">
    </div>
    <div class=${styles.inputGroup}>
        <label for="password">Пароль</label>
        <input type="password" placeholder="Ввведите пароль" id="password" name="password">
    </div>
    <div class=${styles.inputGroup}>
        <label for="repeat_password">Повторите пароль</label>
        <input type="password" placeholder="Повторите пароль" id="repeat_password" name="repeat_password">
    </div>
    <a href="main.html" class=${styles.button}>Зарегистрировать</a>
    <a href="/signin.html" class=${styles.link}>Войти</a>
</div>
`

const root = document.querySelector("#root")

const template = Handlebars.compile(tpl);

const data = {};

root.innerHTML = template(data)