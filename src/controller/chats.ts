import ChatsAPI from "../api/chats";
import Store from "../utils/store";

export default class ChatsController {
  private chatsApi = new ChatsAPI();

  private store = new Store();

  public async getChats() {
    try {
      this.chatsApi.getChats()
        .then((res: XMLHttpRequest) => {
          if (res.status === 200) {
            const chats = JSON.parse(res.response);

            console.log("CHATS -->", chats);

            this.store.setState({ chats });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  }
}
