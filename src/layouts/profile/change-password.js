import Handlebars from "handlebars";
import styles from "./profile.css"

const tpl = `
<div class=${styles.wrapper}>
    <div class=${styles.assetLeft}>
        <a class=${styles.buttonBack} href="/main.html">
            <span >
                <img src="/img/back.svg" alt="Back">
            </span>
        </a>
    </div>
    <article class=${styles.mainContent}>
        <div class=${styles.profileWrapper}>
            <div class=${styles.defaultAvatar}>
                <img src="/img/default-avatar.svg" alt="Нет аватара">
            </div>
            <h2 class=${styles.firstName}>Вася</h2>
            <div class=${styles.profileStringsWrapper}>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Старый пароль</div>
                    <div class=${styles.profileStringRight}>
                        <input type="password" placeholder="Старый пароль" name="oldPassword">
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Новый пароль</div>
                    <div class=${styles.profileStringRight}>
                        <input type="password" placeholder="Новый пароль" name="newPassword">
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Подтвердить новый пароль </div>
                    <div class=${styles.profileStringRight}>
                        <input type="password" placeholder="Повторите пароль" name="repeatPassword">
                    </div>
                </div>
            </div>
            <a href="/main.html" class=${styles.button}>Сохранить</a>
        </div>
    </article>
</div>
`

const root = document.querySelector("#root")

const template = Handlebars.compile(tpl);

const data = {};

root.innerHTML = template(data)
