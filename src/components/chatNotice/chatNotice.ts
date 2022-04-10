import Block from "../../utils/Block";
import template from "./chatNotice.hbs";
import compile from "../../utils/compile";
import * as styles from "../../layouts/main/main.css";

type Props = {}

export default class ChatNotice extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props, styles });
  }
}
