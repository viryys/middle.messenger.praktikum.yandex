import EventBus from "./EventBus";

interface State {
  [key: string]: any;
}

const initialState: State = {
  isLogin: false,
  user: null,
  chats: [],
  currentChatUsers: [],
  currentChat: null,
  token: null,
  chatMessages: [],
};

enum EVENTS {
  LOGIN_DU = "store:login-did-update",
  CHATS_DU = "store:chats-did-update",
  TOKEN_DU = "store:token-did-update",
  MESSAGES_DU = "store:messages-did-update",
}

export default class Store {
  // eslint-disable-next-line no-use-before-define
  static __instance: Store;

  private eventBus: () => EventBus;

  private state: State;

  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this.state = this._makeStateProxy(initialState);

    Store.__instance = this;
  }

  setListener(listener: () => unknown, action: string) {
    if (action === "LOGIN") {
      this.eventBus().on(EVENTS.LOGIN_DU, listener.bind(this));
    }
    if (action === "CHATS") {
      this.eventBus().on(EVENTS.CHATS_DU, listener.bind(this));
    }
    if (action === "TOKEN") {
      this.eventBus().on(EVENTS.TOKEN_DU, listener.bind(this));
    }
    if (action === "CHATS") {
      this.eventBus().on(EVENTS.MESSAGES_DU, listener.bind(this));
    }
  }

  getState() {
    return this.state;
  }

  setState(nextState: State) {
    if (!nextState) {
      return;
    }
    Object.assign(this.state, nextState);
  }

  _makeStateProxy(state: State): State {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(state, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: State, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        if (prop === "isLogin" || prop === "user") {
          self.eventBus().emit(EVENTS.LOGIN_DU);
        }
        if (prop === "chats") {
          self.eventBus().emit(EVENTS.CHATS_DU);
        }
        if (prop === "currentChatUsers") {
          self.eventBus().emit(EVENTS.CHATS_DU);
        }
        if (prop === "currentChat") {
          self.eventBus().emit(EVENTS.CHATS_DU);
        }
        if (prop === "token") {
          self.eventBus().emit(EVENTS.TOKEN_DU);
        }
        if (prop === "chatMessages") {
          self.eventBus().emit(EVENTS.MESSAGES_DU);
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }
}
