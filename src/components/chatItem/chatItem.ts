import Block, { CurrentElementEvent } from "../../utils/Block";
import "../../layouts/main/main.css";
import compile from "../../utils/compile";
import * as template from "./chatItem.hbs";

type Props = {
  title: string,
  id: string,
  avatar: string,
  events?: {
    click: CurrentElementEvent
  }}

export default class ChatItem extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
