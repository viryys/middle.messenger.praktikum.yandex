import backSvg from "bundle-text:../../../static/img/back.svg";
import profileTemplate from "./change-password.hbs";
import * as styles from "./profile.css";

const root = document.querySelector("#root");

const data = { styles };

root.innerHTML = profileTemplate(data);

const logo = document.getElementById("backSVG");

logo.innerHTML = backSvg;
