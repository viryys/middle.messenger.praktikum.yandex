import Block, { CurrentElementEvent } from "../../utils/Block";
import * as template from "./InputLabel.hbs";
import compile from "../../utils/compile";
import { ValidateMsg } from "../../utils/types";

export enum TypesInput {
  Button = "button",
  Checkbox = "checkbox",
  Hidden = "hidden",
  Password = "password",
  Radio = "radio",
  Reset = "reset",
  Submit = "submit",
  Text = "text",
}

type Props = {
  wrapperClassName: string,
  id: string,
  labelName?: string,
  type: TypesInput,
  placeholder: string,
  inputName: string,
  value: string,
  events?: {
    focus?: CurrentElementEvent,
    blur?: CurrentElementEvent
  },
  errorClassName?: string,
  validate?: ValidateMsg}

export class Input extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  getValue(): string {
    return this.props.value;
  }

  getValidate(): boolean {
    return this.props.validate.validate;
  }

  render() {
    return compile(template, { ...this.props });
  }
}
