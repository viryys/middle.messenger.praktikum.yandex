import Router from "./router";
import { Event } from "./types";

const router = new Router("#root");

export function handlerButtonBackClick(event: Event) {
  event.preventDefault();

  router.back();
};

export function validateInputForm(inputVal, validateRules) {
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

  return validateInput;
}
