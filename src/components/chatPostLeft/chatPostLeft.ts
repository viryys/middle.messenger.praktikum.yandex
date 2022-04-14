import Block from "../../utils/Block";
import template from "./chatPostLeft.hbs";
import compile from "../../utils/compile";
import * as styles from "../../layouts/main/main.css";
import { formatDate } from "../../utils/helpers";

type Props = {
  message: any
}

export default class ChatPostLeft extends Block {
  constructor(props: Props, classNameMain: string) {
    super("div", props, classNameMain);
  }

  render() {
    const { message } = this.props;
    const specialDate = formatDate(message.time);

    return compile(template, {
      ...this.props,
      message,
      formatDate: specialDate,
      styles,
    });
  }
}
