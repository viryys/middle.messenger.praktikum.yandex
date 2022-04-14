// @ts-ignore
import * as backSvg from "../../../static/img/back.svg";
import Block, { CurrentElementEvent } from "../../utils/Block";
import "../../layouts/profile/profile.css";
import * as template from "./backButton.hbs";
import compile from "../../utils/compile";

console.log("template", template);

type Props = {
    events?: {
      click: CurrentElementEvent
    },
  }

// eslint-disable-next-line import/prefer-default-export
export class BackButton extends Block {
  constructor(props: Props) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props, backSvg });
  }
}
