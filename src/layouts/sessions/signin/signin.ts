import Block from "../../../utils/Block";
import Validate from "../../../utils/validate";
import signInTemplate from "./signin.hbs";
import * as styles from "./signin.css";
import Button, { Types } from "../../../components/button";
import Input, { TypesInput } from "../../../components/input";
import ErrorResponse from "../../../components/error";
import compile from "../../../utils/compile";
import Router from "../../../utils/router";
import AuthAPI from "../../../api/auth";
import ChatsController from "../../../controller/chats";
import AuthController from "../../../controller/auth";
import { Event } from "../../../utils/types";

// eslint-disable-next-line import/prefer-default-export
export class SignIn extends Block {
  private authApi = new AuthAPI();

  private authController = new AuthController();

  private chatsController = new ChatsController();

  private router = new Router("#root");

  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const errorResponse = new ErrorResponse({
      wrapperClassName: styles.inputGroup,
      errorClassName: styles.error,
      message: "",
    });

    const inputLogin = new Input({
      wrapperClassName: styles.inputGroup,
      id: "login",
      labelName: "Логин",
      placeholder: "Ввведите логин",
      inputName: "login",
      type: TypesInput.Text,
      value: "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#login",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 3),
            ];

            let validateInput = {
              validate: true,
              message: "",
            };

            validateRules.some((validateRule) => {
              if (!validateRule.validate) {
                validateInput = validateRule;
                return true;
              }
              return false;
            });

            inputLogin.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const inputPassword = new Input({
      wrapperClassName: styles.inputGroup,
      id: "password",
      labelName: "Пароль",
      placeholder: "Введите пароль",
      inputName: "password",
      type: TypesInput.Password,
      value: "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#password",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateInput = Validate.requireField(inputVal);

            inputPassword.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const button = new Button({
      title: "Войти",
      type: Types.Submit,
      id: "submitLogin",
      className: styles.button,
      events: {
        click: {
          currentEl: "#submitLogin",
          func: (event) => {
            event.preventDefault();

            const form = {
              inputLogin: [
                Validate.requireField(inputLogin.getValue()),
                Validate.minLength(inputLogin.getValue(), 3),
              ],
              inputPassword: [
                Validate.requireField(inputPassword.getValue()),
                Validate.minLength(inputPassword.getValue(), 6),
              ],
            };

            const inputFields = {
              inputLogin,
              inputPassword,
            };

            let validateForm = true;

            for (const [key, value] of Object.entries(form)) {
              value.some((validateVal) => {
                if (!validateVal.validate) {
                  // @ts-ignore
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
                login: inputLogin.getValue(),
                password: inputPassword.getValue(),
              };

              console.log("SubmitData", allData);

              this.authApi.signIn(allData)
                .then((res: XMLHttpRequest) => {
                  if (res.status === 200) {
                    this.authController.getCurrentUser().then(() => {
                      this.chatsController.getChats().then(() => {
                        this.router.go("/chats");
                      });
                    });

                    errorResponse.setProps({
                      message: "",
                    });
                  } else {
                    const result = JSON.parse(res.response);

                    errorResponse.setProps({
                      errorClassName: styles.success,
                      message: result.reason,
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          },
        },
      },
    }, "");

    return compile(signInTemplate, {
      button,
      inputLogin,
      inputPassword,
      errorResponse,
      styles,
    });
  }
}
