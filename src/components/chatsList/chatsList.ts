import Block, { CurrentElementEvent } from "../../utils/Block";
import * as styles from "../../layouts/main/main.css";
import compile from "../../utils/compile";
import template from "./chatsList.hbs";
import ChatItem from "../chatItem/chatItem";

type Props = {
  chats: [],
  }

function handleChatItemClick() {
  console.log("click chat item");
}

export default class ChatsList extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    const { chats } = this.props;
    let chatsList: any = [];

    if (chats && chats.length > 0) {
      chatsList = chats.reduce((accumulator, chat: any, index: number) => {
        const chatItem = new ChatItem({
          ...chat,
        });

        accumulator[index] = chatItem;

        return accumulator;
      }, []);
    }
    return compile(template, { styles, ...this.props, chatsList });
  }
}
