import arrowRight from "bundle-text:../../../static/img/arrow-right.svg";
import zoom from "bundle-text:../../../static/img/zoom.svg";
import dot from "bundle-text:../../../static/img/dot.svg";
import clip from "bundle-text:../../../static/img/clip.svg";
import backSvg from "bundle-text:../../../static/img/back.svg";
import mainTemplate from "./main.hbs";
import styles from "./main.css";

const root = document.querySelector("#root");

const data = {
  styles,
  arrow: arrowRight,
  zoom,
  dot,
  clip,
  back: backSvg,
};

root.innerHTML = mainTemplate(data);
