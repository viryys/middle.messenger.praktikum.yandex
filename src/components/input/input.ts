import Block, { CurrentElementEvent } from "../../utils/Block";
import template from "./inputLabel.hbs";
import compile from "../../utils/compile";
import {ValidateMsg} from "../../utils/types";

export enum TYPES_INPUT {
  button = "button",
  checkbox = "checkbox",
  hidden = "hidden",
  password = "password",
  radio = "radio",
  reset = "reset",
  submit = "submit",
  text = "text",
}

export class Input extends Block {
  constructor(props: {
    wrapperClassName: string,
    id: string,
    labelName:string,
    type: TYPES_INPUT,
    placeholder:string,
    inputName:string,
    value: string,
    events?: {
      focus?: CurrentElementEvent,
      blur?: CurrentElementEvent
    },
    errorClassName?: string,
    validate?: ValidateMsg}) {
    super("div", props);

    this.props.validate = {
      validate: true,
      message: "",
    };
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
