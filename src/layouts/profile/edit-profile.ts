import * as editProfileTemplate from "./edit-profile.hbs";
import "./profile.css";
import Block from "../../utils/Block";
import compile from "../../utils/compile";
import BackButton from "../../components/backButton";
import { handlerButtonBackClick, validateInputForm } from "../../utils/helpers";
import Input, { TypesInput } from "../../components/input";
import Validate from "../../utils/validate";
import Store from "../../utils/store";
import Button, { Types } from "../../components/button";
import ErrorResponse from "../../components/error";
import UserAPI from "../../api/users";
import { Event } from "../../utils/types";
import AuthController from "../../controller/auth";

const store = new Store();
const authController = new AuthController();
const appStore = store.getState();

export default class EditProfile extends Block {
  private userApi = new UserAPI();

  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    // eslint-disable-next-line no-mixed-operators
    const user = appStore && appStore.user || null;

    const backButton = new BackButton({
      events: {
        click: {
          currentEl: "#backBtn",
          func: handlerButtonBackClick,
        },
      },
    });

    const errorResponse = new ErrorResponse({
      wrapperClassName: "profileStringError",
      errorClassName: "errorMsg",
      message: "",
    });

    const inputEmail = new Input({
      wrapperClassName: "profileStringRight",
      id: "email",
      placeholder: "Введите адрес почты",
      inputName: "email",
      type: TypesInput.Text,
      // eslint-disable-next-line no-mixed-operators
      value: user && user.email || "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#email",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.email(inputVal),
            ];
            const validateInput = validateInputForm(validateRules);

            inputEmail.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? "error" : "",
            });
          },
        },
      },
    });

    const inputLogin = new Input({
      wrapperClassName: "profileStringRight",
      id: "login",
      placeholder: "Изменить логин",
      inputName: "login",
      type: TypesInput.Text,
      // eslint-disable-next-line no-mixed-operators
      value: user && user.login || "",
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
            const validateInput = validateInputForm(validateRules);

            inputLogin.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? "error" : "",
            });
          },
        },
      },
    });

    const inputFirstName = new Input({
      wrapperClassName: "profileStringRight",
      id: "first_name",
      placeholder: "Изменить имя",
      inputName: "first_name",
      type: TypesInput.Text,
      // eslint-disable-next-line no-mixed-operators
      value: user && user.first_name || "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#first_name",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 3),
              Validate.firstName(inputVal),
            ];
            const validateInput = validateInputForm(validateRules);

            inputFirstName.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? "error" : "",
            });
          },
        },
      },
    });

    const inputSecondName = new Input({
      wrapperClassName: "profileStringRight",
      id: "second_name",
      placeholder: "Изменить фамилию",
      inputName: "second_name",
      type: TypesInput.Text,
      // eslint-disable-next-line no-mixed-operators
      value: user && user.second_name || "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#second_name",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.minLength(inputVal, 3),
              Validate.firstName(inputVal),
            ];
            const validateInput = validateInputForm(validateRules);

            inputSecondName.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? "error" : "",
            });
          },
        },
      },
    });

    const inputDisplayName = new Input({
      wrapperClassName: "profileStringRight",
      id: "display_name",
      placeholder: "Измените имя в чате",
      inputName: "display_name",
      type: TypesInput.Text,
      // eslint-disable-next-line no-mixed-operators
      value: user && user.display_name || "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#display_name",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.minLength(inputVal, 3),
              Validate.firstName(inputVal),
            ];
            const validateInput = validateInputForm(validateRules);

            inputDisplayName.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? "error" : "",
            });
          },
        },
      },
    });

    const inputPhone = new Input({
      wrapperClassName: "profileStringRight",
      id: "phone",
      placeholder: "Изменить телефон",
      inputName: "phone",
      type: TypesInput.Text,
      // eslint-disable-next-line no-mixed-operators
      value: user && user.phone || "",
      validate: {
        validate: true,
        message: "",
      },
      events: {
        blur: {
          currentEl: "#phone",
          func: (event: Event) => {
            const inputVal = event.target!.value;
            const validateRules = [
              Validate.requireField(inputVal),
              Validate.phone(inputVal),
            ];

            const validateInput = validateInputForm(validateRules);

            inputPhone.setProps({
              value: inputVal,
              validate: validateInput,
              errorClassName: !validateInput.validate ? "error" : "",
            });
          },
        },
      },
    });

    const button = new Button({
      title: "Сохранить",
      type: Types.Submit,
      id: "submitSignUp",
      className: "button",
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
              inputDisplayName: [
                Validate.minLength(inputDisplayName.getValue(), 3),
                Validate.firstName(inputDisplayName.getValue()),
              ],
              inputPhone: [
                Validate.requireField(inputPhone.getValue()),
                Validate.phone(inputPhone.getValue()),
              ],
            };
            const inputFields = {
              inputEmail,
              inputLogin,
              inputFirstName,
              inputSecondName,
              inputDisplayName,
              inputPhone,
            };

            let validateForm = true;

            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of Object.entries(form)) {
              value.some(
                // eslint-disable-next-line no-loop-func
                (validateVal) => {
                  if (!validateVal.validate) {
                    // @ts-ignore
                    inputFields[key].setProps({
                      validate: validateVal,
                      errorClassName: "error",
                    });

                    validateForm = false;

                    return true;
                  }
                  return false;
                },
              );
            }

            if (validateForm) {
              const allData = {
                email: inputEmail.getValue(),
                login: inputLogin.getValue(),
                first_name: inputFirstName.getValue(),
                second_name: inputSecondName.getValue(),
                display_name: inputDisplayName.getValue(),
                phone: inputPhone.getValue(),
              };

              this.userApi.editProfile(allData)
                .then((res: XMLHttpRequest) => {
                  if (res && res.status === 200) {
                    errorResponse.setProps({
                      message: "Данные успешно сохранены",
                      errorClassName: "success",
                    });

                    authController.getCurrentUser();
                  } else {
                    const result = JSON.parse(res.response);

                    errorResponse.setProps({
                      message: result.reason,
                    });
                  }
                })
                .catch((err) => {
                  // eslint-disable-next-line no-console
                  console.log(err);
                });
            }
          },
        },
      },
    }, "");

    const avatar = user && user.avatar
      ? `https://ya-praktikum.tech/${user.avatar}`
      : "/img/default-avatar.svg";

    const data = {
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputDisplayName,
      inputPhone,
      button,
      errorResponse,
      avatar,
      backButton,
    };

    return compile(editProfileTemplate, data);
  }
}
