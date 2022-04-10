import Block from "../../utils/Block";
import template from "./chatPosts.hbs";
import compile from "../../utils/compile";
import ChatPostLeft from "../chatPostLeft/chatPostLeft";
import ChatPostRight from "../chatPostRight/chatPostRight";
import Store from "../../utils/store";

const store = new Store();
const appStore = store.getState();

export default class ChatPosts extends Block {
  constructor() {
    super("div", {
      messages: [],
    });

    store.setListener(this.componentDidMount.bind(this), "CHATS");
    store.setListener(this.componentDidMount.bind(this), "MESSAGES");
  }

  componentDidMount() {
    this.setProps({
      messages: appStore.chatMessages,
      user: appStore.user,
    });
  }

  render() {
    const { user, messages } = this.props;
    let messagesList = [];

    console.log("rerender", messages);

    if (messages.length > 0 && user && user.id) {
      messagesList = messages.reduce(
        (accumulator, message: any, index: number) => {
          if (user.id !== message.user_id) {
            accumulator[index] = new ChatPostLeft({ message });
          } else {
            accumulator[index] = new ChatPostRight({ message });
          }

          return accumulator;
        }, [],
      );
    }

    return compile(template, { ...this.props, messagesList });
  }
}
