import backSvg from "bundle-text:../../../static/img/back.svg";
import profileTemplate from "./profile.hbs";
import * as styles from "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import renderDOM from "../../utils/renderDOM";

export default class Profile extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const data = {
      first_name: "Иван",
      second_name: "Иванов",
      display_name: "чатИван",
      login: "ivanivanov",
      email: "pochta@yandex.ru",
      phone: "+7(919)111-22-34",
      backSvg,
      styles,
    };
    return compile(profileTemplate, data);
  }
}

renderDOM("#root", new Profile());
