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
                    <div class=${styles.profileStringRight}>
                        <input type="text" placeholder="Введите почту" value={{email}} name="email">
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Логин</div>
                    <div class=${styles.profileStringRight}>
                        <input type="text" placeholder="Новый логин" value={{login}} name="login">
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Имя</div>
                    <div class=${styles.profileStringRight}>
                        <input type="text" placeholder="Изменить имя" name="first_name" value={{first_name}}>
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Фамилия</div>
                    <div class=${styles.profileStringRight}>
                        <input type="text" placeholder="Изменить фамилию" name="second_name" value={{second_name}}>
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Имя в чате</div>
                    <div class=${styles.profileStringRight}>
                        <input type="text" placeholder="Измените имя в чате" name="display_name" value={{display_name}}>
                    </div>
                </div>
                <div class=${styles.profileString}>
                    <div class=${styles.profileStringLeft}>Телефон</div>
                    <div class=${styles.profileStringRight}>
                        <input type="text" placeholder="Измените телефон" name="phone" value={{phone}}>
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

const data = {first_name: "Иван", second_name: "Иванов", display_name: "чатИван", login: "ivanivanov", email: "pochta@yandex.ru", phone: "+7(919)111-22-34"};

root.innerHTML = template(data)
