import { ValidateMsg } from "./types";

export default class Validate {
  static requireField(val: string): ValidateMsg {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    if (!val) {
      validate.validate = false;
      validate.message = "Поле обязательное для заполнения";
    }

    return validate;
  }

  static minLength(val: string, minLength: number) {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    if (val.length < minLength) {
      validate.validate = false;
      validate.message = `Поле короче чем ${minLength} символов`;
    }

    return validate;
  }

  static maxLength(val: string, maxLength: number) {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    if (val.length > maxLength) {
      validate.validate = false;
      validate.message = `Поле длиннее чем ${maxLength} символов`;
    }

    return validate;
  }

  static email(val: string) {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    // eslint-disable-next-line max-len
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegExp.test(val)) {
      validate.validate = false;
      validate.message = "Введите корректный email";
    }

    return validate;
  }

  static phone(val: string) {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/;

    if (!phoneRegExp.test(val)) {
      validate.validate = false;
      validate.message = "Введите корректный телефон";
    }

    return validate;
  }

  static firstName(val: string) {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    const firstNameRegExp = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/;

    if (!firstNameRegExp.test(val)) {
      validate.validate = false;
      validate.message = "Введите корректное имя/фамилию";
    }

    return validate;
  }

  static equelValues(val: string, beforeVal: string) {
    const validate: ValidateMsg = {
      validate: true,
      message: "",
    };

    if (val !== beforeVal) {
      validate.validate = false;
      validate.message = "Повторите пароль верно";
    }

    return validate;
  }
}
