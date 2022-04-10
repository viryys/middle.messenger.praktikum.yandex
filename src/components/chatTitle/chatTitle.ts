import Block from "../../utils/Block";
import * as styles from "../../layouts/main/main.css";
import dot from "bundle-text:../../../static/img/dot.svg";
import compile from "../../utils/compile";
import template from "./chatTitle.hbs";
import Store from "../../utils/store";
import ChatsController from "../../controller/chats";

type Props = {
  chats: [],
  currentChat: number
}

const chatController = new ChatsController();

export default class ChatTitle extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    const { chats, currentChat } = this.props;
    let currentChatInfo = {};

    chats.forEach((chat) => {
      if (chat.id === currentChat) {
        currentChatInfo = chat;
      }
    });

    console.log("currentChatInfo", currentChatInfo);

    return compile(template, {
      styles,
      ...this.props,
      dot,
      currentChatInfo,
    });
  }
}
