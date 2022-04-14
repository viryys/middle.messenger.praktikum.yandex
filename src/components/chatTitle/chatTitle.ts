import Block from "../../utils/Block";
import styles from "../../layouts/main/main.css";
import dot from "../../../static/img/dot.svg";
import compile from "../../utils/compile";
import template from "./chatTitle.hbs";

type Props = {
  chats: [],
  currentChat: number
}

export default class ChatTitle extends Block {
  constructor(props: Props, classNameMain: string) {
    super("div", props, classNameMain);
  }

  render() {
    const { chats, currentChat } = this.props;
    let currentChatInfo = {};

    chats.forEach((chat: { id?: any; }) => {
      if (chat.id === currentChat) {
        currentChatInfo = chat;
      }
    });

    return compile(template, {
      styles,
      ...this.props,
      dot,
      currentChatInfo,
    });
  }
}
