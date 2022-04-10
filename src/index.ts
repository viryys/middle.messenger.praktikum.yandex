import Router from "./utils/router";
import SignIn from "./layouts/sessions/signin";
import SignUp from "./layouts/sessions/signup";
import Profile from "./layouts/profile";
import EditProfile from "./layouts/profile/edit-profile";
import { ChangePassword } from "./layouts/profile/changePassword";
import ChatPage from "./layouts/main";
import Error404 from "./layouts/errors/404";
import Error500 from "./layouts/errors/500";
import Store from "./utils/store";
import AuthController from "./controller/auth";
import ChatsController from "./controller/chats";
import WebSocketApp from "./utils/webSocket";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("#root");
  const store = new Store();
  const appStore = store.getState();
  const authController = new AuthController();
  const chatsController = new ChatsController();

  authController.getCurrentUser().then(
    () => {
      chatsController.getChats().then(() => {
        console.log("store.getState", store.getState());

        router
          .use("/", SignIn)
          .use("/signin", SignIn)
          .use("/signup", SignUp)
          .use("/profile", Profile)
          .use("/profile/edit", EditProfile)
          .use("/profile/change-password", ChangePassword)
          .use("/chats", ChatPage)
          .use("/404", Error404)
          .use("/500", Error500)
          .start();
      });
    },
  );

  const startRouter = () => {
    console.log("startRouter", appStore, appStore.user);
    if (appStore.isLogin) {
      // eslint-disable-next-line no-restricted-globals
      if (location.pathname === "/" || location.pathname === "/signup") {
        router.go("/chats");
      }
    } else {
      router.go("/");
    }
  };

  const wsStart = () => {
    if (appStore.token) {
      const ws = new WebSocketApp(
        appStore.user,
        appStore.currentChat,
        appStore.token,
      );
      store.setState({ ws });
    }
  };

  store.setListener(startRouter, "LOGIN");
  store.setListener(startRouter, "CHATS");
  store.setListener(wsStart, "TOKEN");
});
