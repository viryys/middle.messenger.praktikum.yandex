import profileTemplate from "./change-password.hbs";
import * as styles from "./profile.css"
import backSvg from 'bundle-text:../../../static/img/back.svg';

const root = document.querySelector("#root")

const data = {styles};

root.innerHTML = profileTemplate(data)

let logo = document.getElementById('backSVG');
logo.innerHTML = backSvg;