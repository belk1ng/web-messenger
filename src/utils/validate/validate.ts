interface ValidationField {
  regex: RegExp;
  message: string;
}

export enum VALIDATION_FIELD {
  "NAME" = "name",
  "EMAIL" = "email",
  "LOGIN" = "login",
  "PASSWORD" = "password",
  "PHONE" = "phone",
  "CHAT_TITLE" = "chat-title",
}

export const nameRegExp = /^(?:[A-ZА-Я][a-zа-я]*)(?:-[A-ZА-Я][a-zа-я]*)*$/;
export const loginRegExp = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
export const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
export const phoneRegExp = /^\+?\d{9,14}$/;
export const chatTitleRegExp = new RegExp(/^[\p{L}\s!@#$&()-`.+,]{5,25}$/, "u");

export const nameMessage =
  "Latin or Cyrillic, the first letter must be capital, no spaces and no numbers, no special characters (only a hyphen is allowed).";

export const loginMessage =
  "From 3 to 20 characters, Latin, can contain numbers, but not consist of them, no spaces, no special characters (hyphens and underscores are allowed).";

export const emailMessage =
  "Latin, can include numbers and special characters like a hyphen, there must be a “@” and a dot after it, but there must be letters before the dot.";

export const passwordMessage =
  "From 8 to 40 characters, at least one capital letter and a number are required.";

export const phoneMessage =
  "From 10 to 15 characters, consists of numbers, may start with a plus sign.";

export const chatTitleMessage = "From 5 to 25 letters with spaces and hyphens.";

export const validationRules: Record<VALIDATION_FIELD, ValidationField> = {
  [VALIDATION_FIELD.NAME]: {
    regex: nameRegExp,
    message: nameMessage,
  },
  [VALIDATION_FIELD.LOGIN]: {
    regex: loginRegExp,
    message: loginMessage,
  },
  [VALIDATION_FIELD.EMAIL]: {
    regex: emailRegExp,
    message: emailMessage,
  },
  [VALIDATION_FIELD.PASSWORD]: {
    regex: passwordRegExp,
    message: passwordMessage,
  },
  [VALIDATION_FIELD.PHONE]: {
    regex: phoneRegExp,
    message: phoneMessage,
  },
  [VALIDATION_FIELD.CHAT_TITLE]: {
    regex: chatTitleRegExp,
    message: chatTitleMessage,
  },
};

export const validate = (
  value: string,
  rule: VALIDATION_FIELD
): { isValid: boolean; message: string } => {
  const validationRule = validationRules[rule];

  const isValid = validationRule.regex.test(value);
  const message = isValid ? "" : validationRule.message;

  return { isValid, message };
};
