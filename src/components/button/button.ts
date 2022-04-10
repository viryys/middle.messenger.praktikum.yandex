import Block, { CurrentElementEvent } from "../../utils/Block";
import template from "./button.hbs";
import compile from "../../utils/compile";

export enum Types {
  Submit = "submit",
  Reset = "reset",
  Button = "button"
}

type Props = {
  title: string,
  id: string,
  className:string,
  type: Types,
  events?: {
    click: CurrentElementEvent
}}

export class Button extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
