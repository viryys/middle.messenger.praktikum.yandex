import error500Template from "./500.hbs";
import styles from "./errors.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";

export default class Error500 extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const data = { styles };
    return compile(error500Template, data);
  }
}
