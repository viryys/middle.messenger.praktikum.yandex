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
            let validateInput = {
              validate: true,
              message: "",
            };

            const inputVal = event.target!.value;
            const validateRules = [
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
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.equelValues(inputVal, inputPassword.getValue()),
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

            const form = {
              inputEmail: [
                Validate.requireField(inputEmail.getValue()),
                Validate.email(inputEmail.getValue()),
              ],
              inputLogin: [
                Validate.requireField(inputLogin.getValue()),
                Validate.minLength(inputLogin.getValue(), 3),
              ],
              inputFirstName: [
                Validate.requireField(inputFirstName.getValue()),
                Validate.minLength(inputFirstName.getValue(), 3),
                Validate.firstName(inputFirstName.getValue()),
              ],
              inputSecondName: [
                Validate.requireField(inputSecondName.getValue()),
                Validate.minLength(inputSecondName.getValue(), 3),
                Validate.firstName(inputSecondName.getValue()),
              ],
              inputPhone: [
                Validate.requireField(inputPhone.getValue()),
                Validate.phone(inputPhone.getValue()),
              ],
              inputPassword: [
                Validate.requireField(inputPassword.getValue()),
                Validate.minLength(inputPassword.getValue(), 6),
              ],
              inputRepeatPassword: [
                Validate.equelValues(inputPassword.getValue(), inputRepeatPassword.getValue()),
              ],
            };
            const inputFields = {
              inputEmail,
              inputLogin,
              inputFirstName,
              inputSecondName,
              inputPhone,
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
                email: inputEmail.getValue(),
                login: inputLogin.getValue(),
                first_name: inputFirstName.getValue(),
                second_name: inputSecondName.getValue(),
                phone: inputPhone.getValue(),
                password: inputPassword.getValue(),
              };

              console.log("SumbitData", allData);
            }
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
