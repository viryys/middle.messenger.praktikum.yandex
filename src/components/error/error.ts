import Block from "../../utils/Block";
import compile from "../../utils/compile";
import * as template from "./error.hbs";

type Props = {
  wrapperClassName: string,
  errorClassName?: string,
  message?: string}

export class ErrorResponse extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
