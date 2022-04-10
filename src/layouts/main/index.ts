import arrowRight from "bundle-text:../../../static/img/arrow-right.svg";
import zoom from "bundle-text:../../../static/img/zoom.svg";
import dot from "bundle-text:../../../static/img/dot.svg";
import clip from "bundle-text:../../../static/img/clip.svg";
import backSvg from "bundle-text:../../../static/img/back.svg";
import mainTemplate from "./main.hbs";
import * as styles from "./main.css";
import compile from "../../utils/compile";
import Block from "../../utils/Block";
import Store from "../../utils/store";
import ChatsList from "../../components/chatsList/chatsList";

const store = new Store();
const appStore = store.getState();

const chatsList = new ChatsList();

export default class ChatPage extends Block {
  constructor() {
    super("div", {
      chatsList,
      chats: [],
    });

    store.setListener(this.updateStore.bind(this), "CHATS");
  }

  updateStore() {
    this.setProps({ chats: appStore.chats });
  }

  componentDidMount(oldProps: any) {
    super.componentDidMount(oldProps);

    this.props.chatsList.setProps({
      chats: appStore.chats,
    })
  }

  protected render(): DocumentFragment {
    let chatsList2 = [];

    if (this.props.chats && this.props.chats.length > 0) {
      console.log("chats list", this.props.chats);

      chatsList2 = new ChatsList({
        chats: appStore.chats,
        className: "chat-list-wrapper",
      });
    }

    const data = {
      styles,
      arrow: arrowRight,
      zoom,
      dot,
      clip,
      chatsList: chatsList2,
      back: backSvg,
    };
    return compile(mainTemplate, data);
  }
}
