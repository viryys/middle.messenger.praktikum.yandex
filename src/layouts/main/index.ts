import arrowRight from "bundle-text:../../../static/img/arrow-right.svg";
import zoom from "bundle-text:../../../static/img/zoom.svg";
import clip from "bundle-text:../../../static/img/clip.svg";
import backSvg from "bundle-text:../../../static/img/back.svg";
import mainTemplate from "./main.hbs";
import * as styles from "./main.css";
import compile from "../../utils/compile";
import Block from "../../utils/Block";
import Store from "../../utils/store";
import ChatsList from "../../components/chatsList/chatsList";
import ChatNotice from "../../components/chatNotice/chatNotice";
import Link from "../../components/link";
import Router from "../../utils/router";
import ChatTitle from "../../components/chatTitle/chatTitle";
import ChatPosts from "../../components/chatPosts/chatPosts";

const store = new Store();
const appStore = store.getState();
const router = new Router("#root");

const linkProfile = new Link({
  wrapperClassName: styles["profile-link-wrapper"],
  className: "",
  id: "linkProfile",
  link: "/profile",
  title: `Профиль ${arrowRight}`,
  events: {
    click: {
      currentEl: "#linkProfile",
      func: (ev: Event) => {
        ev.preventDefault();

        router.go("/profile");
      },
    },
  },
});

const chatNotice = new ChatNotice({});

export default class ChatPage extends Block {
  constructor() {
    super("div", {
      chats: [],
      currentChat: null,
    });

    this.props.chats = appStore.chats;
    store.setListener(this.updateStore.bind(this), "CHATS");

    console.log("constructor");
  }

  updateStore() {
    console.log("chats update", appStore);

    this.setProps({
      chats: appStore.chats,
      currentChat: appStore.currentChat,
    });
  }

  componentDidMount(oldProps: any) {
    super.componentDidMount(oldProps);

    console.log("componentDidMount");
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    console.log("componentDidMount");
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected render(): DocumentFragment {
    const { chats, currentChat } = this.props;
    const { chatMessages, user } = appStore;
    const chatsList = new ChatsList({
      chats,
    });

    const chatTitle = new ChatTitle({
      chats,
      currentChat,
    });

    const chatPosts = new ChatPosts({
      messages: chatMessages,
      user,
    });

    const data = {
      styles,
      zoom,
      clip,
      chatsList,
      chatNotice,
      chatTitle,
      currentChat,
      chatPosts,
      linkProfile,
      back: backSvg,
    };

    return compile(mainTemplate, data);
  }
}
