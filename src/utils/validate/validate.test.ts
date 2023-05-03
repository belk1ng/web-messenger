import {
  validate,
  VALIDATION_FIELD,
  nameMessage,
  loginMessage,
  emailMessage,
  passwordMessage,
  phoneMessage,
} from "./validate";

type ValidateResult = ReturnType<typeof validate>;
type TestCases = [string, string, ValidateResult][];

const VALID = {
  isValid: true,
  message: "",
};

const NAME_INVALID = {
  isValid: false,
  message: nameMessage,
};

const LOGIN_INVALID = {
  isValid: false,
  message: loginMessage,
};

const EMAIL_INVALID = {
  isValid: false,
  message: emailMessage,
};

const PASSWORD_INVALID = {
  isValid: false,
  message: passwordMessage,
};

const PHONE_INVALID = {
  isValid: false,
  message: phoneMessage,
};

const NAME_CASES: TestCases = [
  ["Dmitry", "valid", VALID],
  ["Abdul-Uzza", "valid", VALID],
  ["Alya-hibah-Nawal", "invalid", NAME_INVALID],
  ["Abd Rabbo", "invalid", NAME_INVALID],
  ["alex", "invalid", NAME_INVALID],
  ["empty string", "invalid", NAME_INVALID],
];

const LOGIN_CASES: TestCases = [
  ["lol", "valid", VALID],
  ["brabus__228--1337__", "valid", VALID],
  ["Crazyyy John", "invalid", LOGIN_INVALID],
  ["ReallyVeryVeryLongLogin", "invalid", LOGIN_INVALID],
  ["$killoviy_play1er^", "invalid", LOGIN_INVALID],
  ["88005553535", "invalid", LOGIN_INVALID],
  ["НеЛатиница", "invalid", LOGIN_INVALID],
  ["empty string", "invalid", LOGIN_INVALID],
];

const EMAIL_CASES: TestCases = [
  ["john.doe@yahoo.com", "valid", VALID],
  ["belk1ng@yandex.ru", "valid", VALID],
  ["me@belk1ng.com", "valid", VALID],
  ["@me.com", "invalid", EMAIL_INVALID],
  ["just.simple@.com", "invalid", EMAIL_INVALID],
  ["another_Test-case.com", "invalid", EMAIL_INVALID],
  ["НеЛатиница@mail.ru", "invalid", EMAIL_INVALID],
  ["normal.@gmail.r", "invalid", EMAIL_INVALID],
  ["empty string", "invalid", EMAIL_INVALID],
];

const PASSWORD_CASES: TestCases = [
  ["CoolPas1", "valid", VALID],
  ["ReallyVeryCoolPassword123ReallyVeryCoolP", "valid", VALID],
  ["onlylowercase", "invalid", PASSWORD_INVALID],
  ["PasswordWithoutNumbers", "invalid", PASSWORD_INVALID],
  ["Short", "invalid", PASSWORD_INVALID],
  [
    "ReallyVeryCoolPassword123ReallyVeryCoolPReallyVeryCoolPassword123ReallyVeryCoolP",
    "invalid",
    PASSWORD_INVALID,
  ],
  ["empty string", "invalid", PASSWORD_INVALID],
];

const PHONE_CASES: TestCases = [
  ["+780055535", "valid", VALID],
  ["+89096042892", "valid", VALID],
  ["88005553535", "valid", VALID],
  ["+92800555353513", "valid", VALID],
  ["+8800k555353", "invalid", PHONE_INVALID],
  ["&800555353", "invalid", PHONE_INVALID],
  ["900", "invalid", PHONE_INVALID],
  ["-3218391283900", "invalid", PHONE_INVALID],
  ["3218483492384391283900", "invalid", PHONE_INVALID],
  ["empty string", "invalid", PHONE_INVALID],
];

describe("validate unit", () => {
  describe("name validation", () => {
    test.each(NAME_CASES)("%s => %s", (name, _, expected) => {
      expect(validate(name, VALIDATION_FIELD.NAME)).toEqual(expected);
    });
  });

  describe("login validation", () => {
    test.each(LOGIN_CASES)("%s => %s", (name, _, expected) => {
      expect(validate(name, VALIDATION_FIELD.LOGIN)).toEqual(expected);
    });
  });

  describe("email validation", () => {
    test.each(EMAIL_CASES)("%s => %s", (name, _, expected) => {
      expect(validate(name, VALIDATION_FIELD.EMAIL)).toEqual(expected);
    });
  });

  describe("password validation", () => {
    test.each(PASSWORD_CASES)("%s => %s", (name, _, expected) => {
      expect(validate(name, VALIDATION_FIELD.PASSWORD)).toEqual(expected);
    });
  });

  describe("phone validation", () => {
    test.each(PHONE_CASES)("%s => %s", (name, _, expected) => {
      expect(validate(name, VALIDATION_FIELD.PHONE)).toEqual(expected);
    });
  });
});
