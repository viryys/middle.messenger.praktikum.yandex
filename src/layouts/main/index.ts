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
import hbs from "hbs";

export default class ChatPage extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const chatsList = [
      {title: "Чат 1", message: "у меня для вас особенный выпуск новостей!.", time: "12:56", bubble: 34},
      {title: "Чат следующий", message: "Друзья, у меня для вас особенный выпуск новостей!.", time: "13:56", bubble: 24},
      {title: "Игры", message: "Меня для вас особенный выпуск новостей!.", time: "14:56", bubble: 334},
      {title: "Болтовня", message: "Для вас особенный выпуск новостей!.", time: "15:56", bubble: 4},
      {title: "Приватный", message: "Вас особенный выпуск новостей!.", time: "16:56", bubble: 8},
      {title: "Секретный", message: "Друзья, у меня для вас особенный выпуск новостей!.", time: "17:56", bubble: 11},
      {title: "18 этаж", message: "Друзья, у меня для вас особенный выпуск новостей!.", time: "18:56", bubble: 16},
      {title: "Практикум", message: "Друзья, у меня для вас особенный выпуск новостей!.", time: "19:56", bubble: 39},
      {title: "Яндекс", message: "Друзья, у меня для вас особенный выпуск новостей!.", time: "20:56", bubble: 34},
    ];

    const data = {
      styles,
      arrow: arrowRight,
      zoom,
      dot,
      clip,
      chatsList,
      back: backSvg,
    };
    return compile(mainTemplate, data);
  }
}

renderDOM("#root", new ChatPage());
