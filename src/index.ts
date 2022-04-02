import Router from "./utils/router";
import SignIn from "./layouts/sessions/signin";
import SignUp from "./layouts/sessions/signup";
import Profile from "./layouts/profile";
import EditProfile from "./layouts/profile/edit-profile";
import ChangePassword from "./layouts/profile/changePassword";
import ChatPage from "./layouts/main";
import Error404 from "./layouts/errors/404";
import Error500 from "./layouts/errors/500";

const router = new Router("#root");

router
  .use("/", SignIn)
  .use("/signup", SignUp)
  .use("/profile", Profile)
  .use("/edit", EditProfile)
  .use("/change-password", ChangePassword)
  .use("/chats", ChatPage)
  .use("/404", Error404)
  .use("/500", Error500)
  .start();
