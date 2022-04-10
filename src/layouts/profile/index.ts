import profileTemplate from "./profile.hbs";
import * as styles from "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import Store from "../../utils/store";
import BackButton from "../../components/backButton";
import { handlerButtonBackClick } from "../../utils/helpers";
import Link from "../../components/link";
import { AuthController } from "../../controller/auth";
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

export default class Profile extends Block {
  private store = new Store();

  private appStore = this.store.getState();

  private authController = new AuthController();

  private router = new Router("#root");

  constructor(props: Props) {
    super("div", props);

    this.store.setListener(this.updateStore.bind(this), "LOGIN");
  }

  updateStore() {
    this.appStore = this.store.getState();

    this.setProps({ updated: !this.props.updated });
  }

  protected render(): DocumentFragment {
    // eslint-disable-next-line no-mixed-operators
    const user = this.appStore && this.appStore.user || {};

    const backButton = new BackButton({
      events: {
        click: {
          currentEl: "#backBtn",
          func: handlerButtonBackClick,
        },
      },
    });

    const logout = new Link({
      wrapperClassName: styles.profileStringLeft,
      id: "logout",
      title: "Выйти",
      className: `${styles.link} ${styles.warn}`,
      events: {
        click: {
          currentEl: "#logout",
          func: (el) => {
            el.preventDefault();

            this.authController.logout()
              .then(() => {
                this.router.go("/");
              });
          },
        },
      },
    });

    const data = {
      ...user,
      backButton,
      logout,
      styles,
    };
    return compile(profileTemplate, data);
  }
}
