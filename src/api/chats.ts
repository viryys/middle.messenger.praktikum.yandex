import HTTPTransport from "../utils/HTTPTransport";
import { BodyRequest } from "../utils/types";

export default class ChatsAPI {
  private api = new HTTPTransport();

  public getChats() {
    return this.api.get("/chats");
  }
}
