import * as teamplate from "./sendMessageInput.hbs";
import Block, { CurrentElementEvent } from "../../utils/Block";
import compile from "../../utils/compile";
import "../../layouts/main/main.css";
import { ValidateMsg } from "../../utils/types";

type Props = {
  id: string,
  name: string,
  value: string,
  placeholder: string,
  validate?: ValidateMsg,
  events?: {
    focus?: CurrentElementEvent,
    blur?: CurrentElementEvent
  },
}

export default class SendMessageInput extends Block {
  constructor(props: Props) {
    super("div", props, "message-input-wrapper");
  }

  getValue(): string {
    return this.props.value;
  }

  protected render(): DocumentFragment {
    return compile(teamplate, { ...this.props });
  }
}
