import ChatsController from "../controller/chats";
import Store from "./store";

export enum WS_TYPE {
  Message = "message",
  GetOld = "get old",
  Ping = "ping",
}

export default class WebSocketApp {
  private baseWSUrl = "wss://ya-praktikum.tech/ws/chats";

  private pingTimerId: any;

  private user: any;

  private chats = new ChatsController();

  private store = new Store();

  socket: WebSocket;

  constructor(user: any, chatId: number, tokenValue: string) {
    const url = `${this.baseWSUrl}/${user.id}/${chatId}/${tokenValue}`;

    console.log("ws url:", url);

    this.socket = new WebSocket(url);
    this.user = user;

    this.startListener();
  }

  send(content: string, type: WS_TYPE) {
    this.socket.send(
      JSON.stringify({
        content,
        type,
      }),
    );
  }

  close() {
    this.socket.close();
  }

  private ping() {
    this.pingTimerId = setInterval(() => {
      this.socket.send(
        JSON.stringify({
          type: WS_TYPE.Ping,
        }),
      );
    }, 20000);
  }

  startListener() {
    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено...");

      this.send(`${this.user.first_name} в чате!`, WS_TYPE.Message);

      this.ping();
    });

    this.socket.addEventListener("close", (event) => {
      clearInterval(this.pingTimerId);

      if (event.wasClean) {
        console.log("Соединение закрыто чисто!");
      } else {
        console.log("Обрыв соединения!");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        console.log("Получен message", data.content);
        this.send("0", WS_TYPE.GetOld);
        this.chats.getChats();
      }
      if (data.type === "pong") {
        console.log("Получен", event.data);
      }
      if (Array.isArray(data)) {
        console.log("Получен массив последних сообщений", data);
        this.store.setState({ chatMessages: data });
      }
    });

    this.socket.addEventListener("error", (event) => {
      console.log("Ошибка", (<Event | any>event).message);
    });
  }
}
