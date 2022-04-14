// @ts-ignore
import backSvg from "../../../static/img/back.svg";
import Block, { CurrentElementEvent } from "../../utils/Block";
import * as styles from "../../layouts/profile/profile.css";
import template from "./backButton.hbs";
import compile from "../../utils/compile";

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
    return compile(template, { ...this.props, styles, backSvg });
  }
}
