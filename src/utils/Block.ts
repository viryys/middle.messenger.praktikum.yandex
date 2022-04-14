import { nanoid } from "nanoid";
import EventBus from "./EventBus";
import { Nullable, Values } from "./types";

interface BlockMeta<P = any> {
  tagName: string;
  props: P,
  classNameMain?: string,
}

// eslint-disable-next-line no-shadow
enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render"}

export interface CurrentElementEvent {
  currentEl: string,
  func: (el: Event) => void
}

type Events = Values<typeof EVENTS>;

export default class Block<P = any> {
  private readonly _meta: BlockMeta;

  protected _element: Nullable<HTMLElement>;

  protected readonly props: P;

  public id = nanoid(6);

  eventBus: () => EventBus<Events>;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   * @param {string} classNameMain
   *
   * @returns {void}
   */
  public constructor(tagName?: string, props?: P, classNameMain?: string) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      tagName,
      props,
      classNameMain,
    };

    this.props = this._makePropsProxy(props || {} as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, classNameMain } = this._meta;
    this._element = this.createDocumentElement(tagName, classNameMain);
  }

  init() {
    this._createResources();
    this.eventBus().emit(EVENTS.FLOW_CDM, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);

    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  componentDidMount(oldProps: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    if (response) {
      this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: P, newProps: P) {
    return oldProps !== newProps;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    this._removeEvents();

    this._element!.innerHTML = "";

    this._element!.appendChild(fragment);

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  _makePropsProxy(props: P): P {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        if (prop.indexOf("_") === 0) {
          throw new Error("Нет прав");
        }

        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self.eventBus().emit(EVENTS.FLOW_RENDER);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    }) as unknown as P;
  }

  _removeEvents() {
    const events: Record<string, CurrentElementEvent > = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      const currentEl = this._element!.querySelector(events[eventName].currentEl);
      if (currentEl) {
        currentEl.removeEventListener(eventName, events[eventName].func);
      }
    });
  }

  _addEvents() {
    const events: Record<string, CurrentElementEvent > = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      const currentEl = this._element!.querySelector(events[eventName].currentEl);

      if (currentEl) {
        currentEl.addEventListener(eventName, events[eventName].func);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private createDocumentElement(tagName: string, classNameMain?: string) {
    const element = document.createElement(tagName);

    if (classNameMain) {
      element.classList.add(classNameMain);
    }

    return element;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
