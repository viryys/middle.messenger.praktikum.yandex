import error500Template from "./500.hbs";
import * as styles from "./errors.css"

const root = document.querySelector("#root")

const data = {styles};

root.innerHTML = error500Template(data)
