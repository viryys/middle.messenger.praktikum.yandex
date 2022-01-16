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
                    <div class=${styles.profileStringLeft}>Почта</div>
                    <div class=${styles.profileStringRight}>{{email}}</div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Логин</div>
                    <div class=${styles.profileStringRight}>{{login}}</div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Имя</div>
                    <div class=${styles.profileStringRight}>{{first_name}}</div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Фамилия</div>
                    <div class=${styles.profileStringRight}>{{second_name}}</div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Имя в чате</div>
                    <div class=${styles.profileStringRight}>{{display_name}}</div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Телефон</div>
                    <div class=${styles.profileStringRight}>{{phone}}</div>
                </div>
            </div>
            <nav class=${styles.profileStringsMenu}>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>
                        <a class=${styles.link} href="/edit-profile.html">Изменить данные</a>
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>
                        <a class=${styles.link} href="/change-password.html">Изменить пароль</a>
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>
                        <a class="${styles.link} ${styles.warn}" href="/signin.html">Выйти</a>
                    </div>
                </div>
            </nav>
        </div>
    </article>
</div>
`

const root = document.querySelector("#root")

const template = Handlebars.compile(tpl);

const data = {first_name: "Иван", second_name: "Иванов", display_name: "чатИван", login: "ivanivanov", email: "pochta@yandex.ru", phone: "+7(919)111-22-34"};

root.innerHTML = template(data)
