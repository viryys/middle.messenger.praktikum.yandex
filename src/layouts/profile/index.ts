import * as profileTemplate from "./profile.hbs";
import "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import Store from "../../utils/store";
import BackButton from "../../components/backButton";
import { handlerButtonBackClick } from "../../utils/helpers";
import Link from "../../components/link";
import AuthController from "../../controller/auth";
import Router from "../../utils/router";

const backButton = new BackButton({
  events: {
    click: {
      currentEl: "#backBtn",
      func: handlerButtonBackClick,
    },
  },
});

const authController = new AuthController();

const router = new Router("#root");

const editProfile = new Link({
  wrapperClassName: "profileStringLeft",
  id: "editProfile",
  title: "Изменить данные",
  className: "linkProfile",
  link: "/profile/edit",
  events: {
    click: {
      currentEl: "#editProfile",
      func: (el) => {
        el.preventDefault();

        router.go("/profile/edit");
      },
    },
  },
});

const changePassword = new Link({
  wrapperClassName: "profileStringLeft",
  id: "changePassword",
  title: "Изменить пароль",
  className: "linkProfile",
  link: "/profile/change-password",
  events: {
    click: {
      currentEl: "#changePassword",
      func: (el) => {
        el.preventDefault();

        router.go("/profile/change-password");
      },
    },
  },
});

const logout = new Link({
  wrapperClassName: "profileStringLeft",
  id: "logout",
  title: "Выйти",
  className: `${"linkProfile"} ${"warn"}`,
  link: "/logout",
  events: {
    click: {
      currentEl: "#logout",
      func: (el) => {
        el.preventDefault();

        authController.logout()
          .then(() => {
            router.go("/");
          });
      },
    },
  },
});

const store = new Store();

const appStore = store.getState();

export default class Profile extends Block {
  constructor() {
    super("div", {}, "");

    store.setListener(this.updateStore.bind(this), "LOGIN");
  }

  updateStore() {
    this.setProps({ updated: !this.props.updated });
  }

  render(): DocumentFragment {
    // eslint-disable-next-line no-mixed-operators
    const user = appStore && appStore.user || {};
    const avatar = user.avatar
      ? `https://ya-praktikum.tech/${user.avatar}`
      : "/img/default-avatar.svg";

    const data = {
      ...user,
      avatar,
      backButton,
      changePassword,
      editProfile,
      logout,
    };
    return compile(profileTemplate, data);
  }
}
