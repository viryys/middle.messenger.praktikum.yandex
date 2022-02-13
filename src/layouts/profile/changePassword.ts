import backSvg from "bundle-text:../../../static/img/back.svg";
import profileTemplate from "./change-password.hbs";
import * as styles from "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import renderDOM from "../../utils/renderDOM";

export default class ChangePassword extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {

    return compile(profileTemplate, { back: backSvg, styles });
  }
}

renderDOM("#root", new ChangePassword());
