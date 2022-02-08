import Block, { CurrentElementEvent } from "../../utils/Block";
import template from "./button.hbs";
import compile from "../../utils/compile";

export enum TYPES {
  submit = "submit",
  reset = "reset",
  button = "button"}

export class Button extends Block {
  constructor(props: {
    title: string,
    id: string,
    className:string,
    type: TYPES,
    events?: {
      click: CurrentElementEvent
    }}) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
