import signinTemplate from "./signin.hbs";
import * as styles from "./signin.css"

const root = document.querySelector("#root")

const data = {styles};

root.innerHTML = signinTemplate(data)
