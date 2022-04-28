import Block, { CurrentElementEvent } from "../../utils/Block";
import * as template from "./link.hbs";
import compile from "../../utils/compile";

type Props = {
  title: string,
  id: string,
  className: string,
  wrapperClassName: string,
  link?: string
  events?: {
    click: CurrentElementEvent
  }}

export default class Link extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
