import * as arrowRight from "../../../static/img/arrow-right.svg";
import * as zoom from "../../../static/img/zoom.svg";
import * as clip from "../../../static/img/clip.svg";
import * as backSvg from "../../../static/img/back.svg";
import * as mainTemplate from "./main.hbs";
import "./main.css";
import compile from "../../utils/compile";
import Block from "../../utils/Block";
import Store from "../../utils/store";
import ChatsList from "../../components/chatsList/chatsList";
import ChatNotice from "../../components/chatNotice/chatNotice";
import Link from "../../components/link";
import Router from "../../utils/router";
import ChatTitle from "../../components/chatTitle/chatTitle";
import ChatPosts from "../../components/chatPosts/chatPosts";
import SendMessageInput from "../../components/sendMessageInput";
import Button, { Types } from "../../components/button";
import { WS_TYPE } from "../../utils/webSocket";
import { Event } from "../../utils/types";

const store = new Store();
const appStore = store.getState();
const router = new Router("#root");

const linkProfile = new Link({
  wrapperClassName: "profile-link-wrapper",
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
    }, "main-wrapper");

    this.props.chats = appStore.chats;
    store.setListener(this.updateStore.bind(this), "CHATS");
  }

  updateStore() {
    this.setProps({
      chats: appStore.chats,
      currentChat: appStore.currentChat,
    });
  }

  protected render(): DocumentFragment {
    const { chats, currentChat } = this.props;
    const { chatMessages } = appStore;
    const chatsList = new ChatsList({
      chats,
    });

    const chatTitle = new ChatTitle({
      chats,
      currentChat,
    }, "main-chat-top");

    const chatPosts = new ChatPosts(
      { messages: chatMessages },
      "main-chat-content",
    );

    const message = new SendMessageInput({
      id: "sendMessage",
      name: "message",
      value: "",
      placeholder: "Введите сообщение",
    });

    const sendMessageButton = new Button({
      title: `${backSvg}`,
      id: "submitMessage",
      type: Types.Button,
      className: "btnSubmit",
      events: {
        click: {
          currentEl: "#submitMessage",
          func: (ev: Event) => {
            ev.preventDefault();

            // @ts-ignore
            const getMessage = document.getElementById("sendMessage").value;

            const { ws } = appStore;
            if (getMessage) {
              ws.send(getMessage, WS_TYPE.Message);
            }
          },
        },
      },
    }, "btn-right");

    const data = {
      zoom,
      clip,
      chatsList,
      chatNotice,
      chatTitle,
      currentChat,
      chatPosts,
      message,
      sendMessageButton,
      linkProfile,
    };

    return compile(mainTemplate, data);
  }
}
