import Block from "../../utils/Block";
import "../../layouts/main/main.css";
import compile from "../../utils/compile";
import * as template from "./chatsList.hbs";
import ChatItem from "../chatItem/chatItem";
import { Event } from "../../utils/types";
import Store from "../../utils/store";
import ChatsController from "../../controller/chats";

type Props = {
  chats: [],
}

const store = new Store();
const chatController = new ChatsController();

function handleChatItemClick(event: Event) {
  const { currentTarget } = event;
  const chatId = +currentTarget.getAttribute("data-id");

  store.setState({ currentChat: chatId });
  chatController.getChatToken(chatId);
}

export default class ChatsList extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    const { chats } = this.props;
    let chatsList: any = [];

    if (chats && chats.length > 0) {
      chatsList = chats.reduce((accumulator: ChatItem[], chat: any, index: number) => {
        const chatItem = new ChatItem({
          ...chat,
          events: {
            click: {
              currentEl: "._main__chat-item-wrapper",
              func: handleChatItemClick,
            },
          },
        });

        accumulator[index] = chatItem;

        return accumulator;
      }, []);
    }
    return compile(template, { ...this.props, chatsList });
  }
}
