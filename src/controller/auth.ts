import AuthAPI from "../api/auth";
import Store from "../utils/store";
import Router from "../utils/router";

export class AuthController {
  private authApi = new AuthAPI();

  private router = new Router("#root");

  private store = new Store();

  public async getCurrentUser() {
    try {
      this.authApi.getCurrentUser()
        .then((res: XMLHttpRequest) => {
          if (res.status === 200) {
            const user = JSON.parse(res.response);

            this.store.setState({ isLogin: true, user });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  public async logout() {
    try {
      this.authApi.logout()
        .then((res: XMLHttpRequest) => {
          if (res.status === 200) {
            this.store.setState({
              isLogin: false,
              user: {},
              chats: [],
              currentChatUsers: [],
              currentChat: null,
              token: null,
              chatMessages: [],
            });

            this.router.go("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }
}
