import arrowRight from "bundle-text:../../../static/img/arrow-right.svg";
import zoom from "bundle-text:../../../static/img/zoom.svg";
import dot from "bundle-text:../../../static/img/dot.svg";
import clip from "bundle-text:../../../static/img/clip.svg";
import backSvg from "bundle-text:../../../static/img/back.svg";
import mainTemplate from "./main.hbs";
import * as styles from "./main.css";
import compile from "../../utils/compile";
import Block from "../../utils/Block";
import renderDOM from "../../utils/renderDOM";

export default class ChatPage extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const data = {
      styles,
      arrow: arrowRight,
      zoom,
      dot,
      clip,
      back: backSvg,
    };
    return compile(mainTemplate, data);
  }
}

renderDOM("#root", new ChatPage());
