import Block from "../../../utils/Block";
import renderDOM from "../../../utils/renderDOM";
import compile from "../../../utils/compile";
import signUpTemplate from "./signup.hbs";
import * as styles from "../signin/signin.css";
import Button, { TYPES } from "../../../components/button";
import Input, { TYPES_INPUT } from "../../../components/input";
import Validate from "../../../utils/validate";

export class SignUp extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    const button = new Button({
      title: "Зарегистрировать",
      type: TYPES.submit,
      id: "submitSignUp",
      className: styles.button,
      events: {
        click: {
          currentEl: "#submitSignUp",
          func: (event) => {
            event.preventDefault();

            const allData = {};

            console.log("clicked", allData);
          },
        },
      },
    });

    const inputEmail = new Input({
      wrapperClassName: styles.inputGroup,
      id: "email",
      labelName: "Почта",
      placeholder: "Ввведите адрес почты",
      inputName: "email",
      type: TYPES_INPUT.text,
      value: "",
      events: {
        blur: {
          currentEl: "#email",
          func: (event) => {
            console.log("blur email", event.target!.value);
            let validateInput = {
              validate: true,
              message: "",
            };

            const inputVal = event.target!.value;
            const validateRules = [
              Validate.minLength(inputVal, 3),
              Validate.email(inputVal),
            ];

            validateRules.some((validateRule) => {
              if (!validateRule.validate) {
                validateInput = validateRule;
                return true;
              }
              return false;
            });

            inputEmail.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

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

    const inputFirstName = new Input({
      wrapperClassName: styles.inputGroup,
      id: "first_name",
      labelName: "Имя",
      placeholder: "Ввведите имя",
      inputName: "first_name",
      type: TYPES_INPUT.text,
      value: "",
      events: {
        blur: {
          currentEl: "#first_name",
          func: (event) => {
            console.log("blur first_name", event.target!.value);
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 3),
              Validate.firstName(inputVal),
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

            inputFirstName.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const inputSecondName = new Input({
      wrapperClassName: styles.inputGroup,
      id: "second_name",
      labelName: "Фамилия",
      placeholder: "Ввведите фамилию",
      inputName: "second_name",
      type: TYPES_INPUT.text,
      value: "",
      events: {
        blur: {
          currentEl: "#second_name",
          func: (event) => {
            console.log("blur second_name", event.target!.value);
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 3),
              Validate.firstName(inputVal),
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

            inputSecondName.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    const inputPhone = new Input({
      wrapperClassName: styles.inputGroup,
      id: "phone",
      labelName: "Телефон",
      placeholder: "Ввведите телефон",
      inputName: "phone",
      type: TYPES_INPUT.text,
      value: "",
      events: {
        blur: {
          currentEl: "#phone",
          func: (event) => {
            console.log("blur [phone]", event.target!.value);
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.phone(inputVal),
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

            inputPhone.setProps({
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
      placeholder: "Ввведите пароль",
      inputName: "password",
      type: TYPES_INPUT.password,
      value: "",
      events: {
        blur: {
          currentEl: "#password",
          func: (event) => {
            console.log("blur [password]", event.target!.value);
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 6),
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
      wrapperClassName: styles.inputGroup,
      id: "repeat_password",
      labelName: "Повторите пароль",
      placeholder: "Повторите пароль",
      inputName: "password",
      type: TYPES_INPUT.password,
      value: "",
      events: {
        blur: {
          currentEl: "#repeat_password",
          func: (event) => {
            console.log("blur [repeat_password]", event.target!.value);
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.equelValues(inputVal, inputPassword.getValue()),
              Validate.minLength(inputVal, 6),
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

            inputRepeatPassword.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? styles.error : "",
            });
          },
        },
      },
    });

    return compile(signUpTemplate, {
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputRepeatPassword,
      button,
      styles,
    });
  }
}

renderDOM("#root", new SignUp());
