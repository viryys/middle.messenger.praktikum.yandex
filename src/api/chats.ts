import HTTPTransport from "../utils/HTTPTransport";
import { BodyRequest } from "../utils/types";

export default class ChatsAPI {
  private api = new HTTPTransport();

  public getChats() {
    return this.api.get("/chats");
  }

  public getChatToken(chatId: number) {
    return this.api.post(`/chats/token/${chatId}`);
  }

  public getChatUsers(chatId: number) {
    return this.api.get(`/chats/${chatId}/users`);
  }

  public createChat(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.post("/chats", options);
  }

  public deleteChat(chatId: number) {
    const options = {
      chatId,
    };

    return this.api.delete("/chats", options);
  }

  public addUsersToChat(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.put("/chats/users", options);
  }

  public deleteUsersFromChat(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.delete("/chats/users", options);
  }
}
