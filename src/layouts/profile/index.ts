import profileTemplate from "./profile.hbs";
import * as styles from "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import Store from "../../utils/store";
import BackButton from "../../components/backButton";
import { handlerButtonBackClick } from "../../utils/helpers";
import Link from "../../components/link";
import AuthController from "../../controller/auth";
import Router from "../../utils/router";

type Props = {
  updated: boolean,
}

export const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};

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
  wrapperClassName: styles.profileStringLeft,
  id: "editProfile",
  title: "Изменить данные",
  className: styles.link,
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
  wrapperClassName: styles.profileStringLeft,
  id: "changePassword",
  title: "Изменить пароль",
  className: styles.link,
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
  wrapperClassName: styles.profileStringLeft,
  id: "logout",
  title: "Выйти",
  className: `${styles.link} ${styles.warn}`,
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
  constructor(props: Props) {
    super("div", props);

    store.setListener(this.updateStore.bind(this), "LOGIN");
  }

  updateStore() {
    this.setProps({ updated: !this.props.updated });
  }

  protected render(): DocumentFragment {
    // eslint-disable-next-line no-mixed-operators
    const user = appStore && appStore.user || {};
    const avatar = user.avatar
      ? `https://ya-praktikum.tech/${user.avatar}`
      : "/img/default-avatar.svg";

    console.log("profile render", user, user.avatar);

    const data = {
      ...user,
      avatar,
      backButton,
      changePassword,
      editProfile,
      logout,
      styles,
    };
    return compile(profileTemplate, data);
  }
}
