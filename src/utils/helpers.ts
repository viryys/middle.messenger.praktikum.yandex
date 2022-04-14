import Router from "./router";
import { Event } from "./types";

const router = new Router("#root");

export function handlerButtonBackClick(event: Event) {
  event.preventDefault();

  router.back();
}

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

export function formatDate(date) {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("ru", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("ru", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("ru", { day: "2-digit" }).format(d);

  return `${da}-${mo}-${ye} ${d.getHours()}:${d.getMinutes()}`;
}
