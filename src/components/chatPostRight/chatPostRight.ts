import Block from "../../utils/Block";
import template from "./chatPostRight.hbs";
import compile from "../../utils/compile";
import * as styles from "../../layouts/main/main.css";

type Props = {
  message: any,
}

export default class ChatPostRight extends Block {
  constructor(props: Props, classNameMain) {
    super("div", props, classNameMain);
  }

  render() {
    const { message } = this.props;

    return compile(template, { ...this.props, message, styles });
  }
}
