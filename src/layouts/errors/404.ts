import * as error404Template from "./404.hbs";
import "./errors.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";

export default class Error404 extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const data = { };
    return compile(error404Template, data);
  }
}
