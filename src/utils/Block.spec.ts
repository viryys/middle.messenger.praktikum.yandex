import chai from "chai";
import { JSDOM } from "jsdom";
import Block from "./Block";
import compile from "./compile";
import renderDOM from "./renderDOM";

interface TestBlockProps {
  value: string;
  id: string
}

describe("Block component", () => {
  const defaultProps = { id: "test", value: "default-value" };

  beforeEach(() => {
    const dom = new JSDOM(
      "<!DOCTYPE html><head><title>JSDOM</title></head><body><div id=\"app\"></div></body>",
      {
        url: "http://localhost:3000",
      },
    );
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
    (global as any).window.scrollTo = () => {};
  });

  const createBlock = (options: TestBlockProps = defaultProps) => {
    class Test extends Block<TestBlockProps> {
      override render() {
        const func = () => this.props.value;
        return compile(func, {});
      }
    }

    const testBlockObj = new Test("div", options, options.id);

    renderDOM("#app", testBlockObj);

    return testBlockObj;
  };

  describe("change props", () => {
    it("render function should render current props", () => {
      const testBlock = createBlock();
      chai
        .expect(document.getElementsByClassName("test")[0].innerHTML)
        .to.contains("default-value");

      testBlock.setProps({ id: "test", value: "new-value" });

      chai
        .expect(document.getElementsByClassName("test")[0].innerHTML)
        .to.contains("new-value");
    });
  });
});
