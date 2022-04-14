/* eslint-disable max-classes-per-file */
import { expect } from "chai";
import { JSDOM } from "jsdom";
import Router from "./router";
import Block from "./Block";
import compile from "./compile";

class SimplePage extends Block {
  constructor(props: {}, rootId: string) {
    super("div", props, rootId);
  }

  override render(): DocumentFragment {
    const func = () => "<span id=\"simple-page-id\">simple page content</span>";

    return compile(func, {});
  }
}

class CollectionPage extends Block {
  constructor(props: {}, rootId: string) {
    super("main", props, rootId);
  }

  override render(): DocumentFragment {
    const func = () => "<span id=\"collection-page-id\">1, 2, 3, 4, 5</span>";

    return compile(func, {});
  }
}

describe("router", () => {
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

    const router = new Router("#app");
    // @ts-ignore
    router.use("simple", SimplePage);
    // @ts-ignore
    router.use("collection", CollectionPage);
  });

  it("should be singleton", () => {
    const router = new Router("#app");
    expect(router).to.eq(new Router());
  });

  describe("go()", () => {
    it("should render valid page", async () => {
      expect(document.getElementById("app")?.innerHTML).to.eq("");
      const router = new Router("#app");
      router.go("simple");
      expect(document.getElementById("simple-page-id")?.textContent).to.eq(
        "simple page content",
      );
    });

    it("should change current page", async () => {
      expect(document.getElementById("app")?.innerHTML).to.eq("");
      const router = new Router("#app");
      await router.go("collection");
      expect(document.getElementById("collection-page-id")?.textContent).to.eq(
        "1, 2, 3, 4, 5",
      );
    });
  });
});
