import sentAt from "./sentAt";

describe("sentAt unit", () => {
  describe("Tests with valid input", () => {
    test("2021-04-13T10:22:22.000 => 10:22", () => {
      expect(sentAt("2021-04-13T10:22:22.000")).toBe("10:22");
    });

    test("2019-12-31 22:02 => 22:02", () => {
      expect(sentAt("2019-12-31 22:02")).toBe("22:02");
    });

    test("08.05.2001-13:19 => 13:19", () => {
      expect(sentAt("08.05.2001-13:19")).toBe("13:19");
    });

    test("08.05.2009 => 00:00", () => {
      expect(sentAt("08.05.2009")).toBe("00:00");
    });
  });

  describe("Tests with invalid input", () => {
    test("something wrong => Invalid date format", () => {
      expect(sentAt("something wrong")).toBe("Invalid date format");
    });

    test("2014-25-23 => Invalid date format", () => {
      expect(sentAt("2014-25-23")).toBe("Invalid date format");
    });
  });
});
