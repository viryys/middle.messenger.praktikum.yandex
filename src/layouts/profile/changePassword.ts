import profileTemplate from "./change-password.hbs";
import * as styles from "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import BackButton from "../../components/backButton";
import { handlerButtonBackClick, validateInputForm } from "../../utils/helpers";
import Input, { TypesInput } from "../../components/input";
import Validate from "../../utils/validate";
import { Event } from "../../utils/types";
import Button, { Types } from "../../components/button";
import ErrorResponse from "../../components/error";
import UserAPI from "../../api/users";
import Router from "../../utils/router";
import Store from "../../utils/store";

const store = new Store();
const appStore = store.getState();

export class ChangePassword extends Block {
  private userApi = new UserAPI();

  private router = new Router("#root");

  constructor() {
    super("div", {
      user: {},
    });

    this.props.user = appStore.user;
    store.setListener(this.updateStore.bind(this), "LOGIN");
  }

  updateStore() {
    this.setProps({ user: appStore.user });
  }

  protected render(): DocumentFragment {
    const inputOldPassword = new Input({
      wrapperClassName: styles.profileStringRight,
      id: "oldPassword",
      labelName: undefined,
      placeholder: "Ввведите старый пароль",
      inputName: "oldPassword",
      type: TypesInput.Password,
      value: "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#oldPassword",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 6),
            ];
            const validateInput = validateInputForm(inputVal, validateRules);

            inputOldPassword.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const inputPassword = new Input({
      wrapperClassName: styles.profileStringRight,
      id: "newPassword",
      labelName: undefined,
      placeholder: "Ввведите новый пароль",
      inputName: "newPassword",
      type: TypesInput.Password,
      value: "",
      validate: {
        validate: true,
        message: "",
      },
      errorClassName: styles.error,
      events: {
        blur: {
          currentEl: "#newPassword",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 6),
            ];
            const validateInput = validateInputForm(inputVal, validateRules);

            inputPassword.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const inputRepeatPassword = new Input({
      wrapperClassName: styles.profileStringRight,
      id: "repeat_password",
      labelName: undefined,
      placeholder: "Повторите пароль",
      inputName: "repeatPassword",
      type: TypesInput.Password,
      value: "",
      validate: {
        validate: true,
        message: "",
      },
      errorClassName: styles.error,
      events: {
        blur: {
          currentEl: "#repeat_password",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.equelValues(inputVal, inputPassword.getValue()),
            ];
            const validateInput = validateInputForm(inputVal, validateRules);

            inputRepeatPassword.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const errorResponse = new ErrorResponse({
      wrapperClassName: styles.profileStringError,
      errorClassName: styles.errorMsg,
      message: "",
    });

    const button = new Button({
      title: "Сохранить",
      type: Types.Submit,
      id: "submitPassword",
      className: styles.button,
      events: {
        click: {
          currentEl: "#submitPassword",
          func: (event) => {
            event.preventDefault();

            const form = {
              inputOldPassword: [
                Validate.requireField(inputOldPassword.getValue()),
                Validate.minLength(inputOldPassword.getValue(), 3),
              ],
              inputPassword: [
                Validate.requireField(inputPassword.getValue()),
                Validate.minLength(inputPassword.getValue(), 6),
              ],
              inputRepeatPassword: [
                Validate.equelValues(inputPassword.getValue(), inputPassword.getValue()),
              ],
            };

            const inputFields = {
              inputOldPassword,
              inputPassword,
              inputRepeatPassword,
            };

            let validateForm = true;

            for (const [key, value] of Object.entries(form)) {
              value.some((validateVal) => {
                if (!validateVal.validate) {
                  inputFields[key].setProps({
                    validate: validateVal,
                    errorClassName: styles.error,
                  });

                  validateForm = false;

                  return true;
                }
                return false;
              });
            }

            if (validateForm) {
              const allData = {
                oldPassword: inputOldPassword.getValue(),
                newPassword: inputPassword.getValue(),
              };

              console.log("SubmitData", allData);

              this.userApi.changePassword(allData)
                .then((res: XMLHttpRequest) => {

                  if (res.status === 200) {

                    this.router.go("/chats");

                    errorResponse.setProps({
                      message: "",
                    });
                  } else {
                    const result = res.response;

                    console.log(result, res);
                    errorResponse.setProps({
                      errorClassName: styles.errorMsg,
                      message: res.response,
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          },
        },
      },
    }, "");

    const backButton = new BackButton({
      events: {
        click: {
          currentEl: "#backBtn",
          func: handlerButtonBackClick,
        },
      },
    });

    const avatar = this.props.user && this.props.user.avatar
      ? `https://ya-praktikum.tech/${this.props.user.avatar}`
      : "/img/default-avatar.svg";

    return compile(profileTemplate, {
      button,
      inputOldPassword,
      inputPassword,
      inputRepeatPassword,
      backButton,
      errorResponse,
      avatar,
      styles,
    });
  }
}
