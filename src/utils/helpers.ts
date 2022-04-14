import Router from "./router";
import { Event } from "./types";

const router = new Router("#root");

export function handlerButtonBackClick(event: Event) {
  event.preventDefault();

  router.back();
}

export function validateInputForm(validateRules: any) {
  let validateInput: { validate: any; message?: string } = {
    validate: true,
    message: "",
  };

  validateRules.some((validateRule: { validate: any; message?: string; }) => {
    if (!validateRule.validate) {
      validateInput = validateRule;
      return true;
    }
    return false;
  });

  return validateInput;
}

export function formatDate(date: string | number | Date) {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("ru", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("ru", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("ru", { day: "2-digit" }).format(d);

  return `${da}-${mo}-${ye} ${d.getHours()}:${d.getMinutes()}`;
}
