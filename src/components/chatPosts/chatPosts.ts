import Block from "../../utils/Block";
import template from "./chatPosts.hbs";
import compile from "../../utils/compile";
import ChatPostLeft from "../chatPostLeft/chatPostLeft";
import ChatPostRight from "../chatPostRight/chatPostRight";
import Store from "../../utils/store";
import * as styles from "../../layouts/main/main.css";
import { Props } from "../../utils/types";

const store = new Store();
const appStore = store.getState();

export default class ChatPosts extends Block {
  constructor(props: Props, classNameMain: string) {
    super("div", props, classNameMain);

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

    if (messages.length > 0 && user && user.id) {
      // eslint-disable-next-line max-len
      messagesList = messages.reduce((accumulator: ChatPostRight[] | ChatPostLeft[], message: any, index: number) => {
        if (user.id !== message.user_id) {
          accumulator[index] = new ChatPostLeft({ message }, styles["message-others-wrapper"]);
        } else {
          accumulator[index] = new ChatPostRight({ message }, styles["message-yours-wrapper"]);
        }

        return accumulator;
      }, []);
    }

    return compile(template, { ...this.props, messagesList });
  }
}
