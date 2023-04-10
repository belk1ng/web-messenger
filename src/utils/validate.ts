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
  "MESSAGE" = "message",
}

const nameRegExp = /^[А-ЯA-Z][-А-ЯA-Zа-яa-z]+/;
const loginRegExp = /^[a-zA-Z][a-zA-Z0-9_-]{3,20}$/;
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegExp =
  /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const phoneRegExp = /\+?[0-9]{10,15}/;
const messageRegExp = /^[\s\S]/;

const nameMessage =
  "Latin or Cyrillic, the first letter must be capital, no spaces and no numbers, no special characters (only a hyphen is allowed).";

const loginMessage =
  "From 3 to 20 characters, Latin, can contain numbers, but not consist of them, no spaces, no special characters (hyphens and underscores are allowed).";

const emailMessage =
  "Latin, can include numbers and special characters like a hyphen, there must be a “@” and a dot after it, but there must be letters before the dot.";

const passwordMessage =
  "From 8 to 40 characters, at least one capital letter and a number are required.";

const phoneMessage =
  "From 10 to 15 characters, consists of numbers, may start with a plus sign.";

const messageValidationError = "";

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
  [VALIDATION_FIELD.MESSAGE]: {
    regex: messageRegExp,
    message: messageValidationError,
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
