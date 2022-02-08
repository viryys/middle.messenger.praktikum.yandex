import Block from "../../../utils/Block";
import Validate from "../../../utils/validate";
import signInTemplate from "./signin.hbs";
import * as styles from "./signin.css";
import Button, { TYPES } from "../../../components/button";
import Input, { TYPES_INPUT } from "../../../components/input";
import compile from "../../../utils/compile";
import renderDOM from "../../../utils/renderDOM";

export class SignIn extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const inputLogin = new Input({
      wrapperClassName: styles.inputGroup,
      id: "login",
      labelName: "Логин",
      placeholder: "Ввведите логин",
      inputName: "login",
      type: TYPES_INPUT.text,
      value: "",
      events: {
        blur: {
          currentEl: "#login",
          func: (event) => {
            console.log("blur login", event.target!.value);
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
      type: TYPES_INPUT.password,
      value: "",
      events: {
        blur: {
          currentEl: "#password",
          func: (event) => {
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
      type: TYPES.submit,
      id: "submitLogin",
      className: styles.button,
      events: {
        click: {
          currentEl: "#submitLogin",
          func: (event) => {
            event.preventDefault();

            const allData = {
              login: inputLogin.getValue(),
              password: inputPassword.getValue(),
            };

            console.log("clicked", allData);
          },
        },
      },
    });

    return compile(signInTemplate, {
      button,
      inputLogin,
      inputPassword,
      styles,
    });
  }
}

renderDOM("#root", new SignIn());
