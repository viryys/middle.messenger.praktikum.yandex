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

            this.store.setState({ chats });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  public async getChatToken(chatId: number) {
    try {
      this.chatsApi.getChatToken(chatId)
        .then((res: XMLHttpRequest) => {
          console.log(res.response);

          if (res.status === 200) {
            const response = JSON.parse(res.response);

            this.store.setState({ token: response.token });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  public async getChatUsers(userId: number) {
    try {
      this.chatsApi.getChatUsers(userId)
        .then((res: XMLHttpRequest) => {
          if (res.status === 200) {
            const currentChatUsers = JSON.parse(res.response);
            this.store.setState({ currentChatUsers });
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
