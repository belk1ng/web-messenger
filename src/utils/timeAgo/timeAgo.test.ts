import timeAgo from "./timeAgo";

describe("timeAgo unit", () => {
  describe("Tests for returning 'now'", () => {
    test("current time => now", () => {
      const testTime = new Date().toISOString();

      expect(timeAgo(testTime)).toBe("now");
    });

    test("current time - 4 seconds => now", () => {
      const testTime = new Date();
      testTime.setSeconds(testTime.getSeconds() - 4);

      expect(timeAgo(testTime.toISOString())).toBe("now");
    });
  });

  describe("Tests for returning 'n seconds ago'", () => {
    test("current time - 10 secs => 10 seconds ago", () => {
      const testTime = new Date();
      testTime.setSeconds(testTime.getSeconds() - 10);

      expect(timeAgo(testTime.toISOString())).toBe("10 seconds ago");
    });

    test("current time - 59 secs => 59 seconds ago", () => {
      const testTime = new Date();
      testTime.setSeconds(testTime.getSeconds() - 59);

      expect(timeAgo(testTime.toISOString())).toBe("59 seconds ago");
    });
  });

  describe("Tests for returning 'n minutes ago'", () => {
    test("current time - 119 secs => a minute ago", () => {
      const testTime = new Date();
      testTime.setSeconds(testTime.getSeconds() - 119);

      expect(timeAgo(testTime.toISOString())).toBe("a minute ago");
    });

    test("current time - 3 mins => 3 minutes ago", () => {
      const testTime = new Date();
      testTime.setMinutes(testTime.getMinutes() - 3);

      expect(timeAgo(testTime.toISOString())).toBe("3 minutes ago");
    });

    test("current time - 59 mins => 59 minutes ago", () => {
      const testTime = new Date();
      testTime.setMinutes(testTime.getMinutes() - 59);

      expect(timeAgo(testTime.toISOString())).toBe("59 minutes ago");
    });
  });

  describe("Tests for returning 'n hours ago'", () => {
    test("current time - 1 hour mins => an hour ago", () => {
      const testTime = new Date();
      testTime.setHours(testTime.getHours() - 1);

      expect(timeAgo(testTime.toISOString())).toBe("an hour ago");
    });

    test("current time - 23 hours => 23 hours ago", () => {
      const testTime = new Date();
      testTime.setHours(testTime.getHours() - 23);

      expect(timeAgo(testTime.toISOString())).toBe("23 hours ago");
    });
  });

  describe("Tests for returning 'WeekDay'", () => {
    test("current time - 1 day => WeekDay", () => {
      const testTime = new Date();
      testTime.setDate(testTime.getDate() - 1);

      expect(timeAgo(testTime.toISOString())).toBe(
        testTime.toLocaleDateString("en", { weekday: "short" })
      );
    });

    test("current time - 7 days => WeekDay", () => {
      const testTime = new Date();
      testTime.setDate(testTime.getDate() - 7);

      expect(timeAgo(testTime.toISOString())).toBe(
        testTime.toLocaleDateString("en", { weekday: "short" })
      );
    });
  });

  describe("Tests for returning 'day-month-year'", () => {
    test("current time - 2 months => day-month", () => {
      const testTime = new Date();
      testTime.setMonth(testTime.getMonth() - 2);

      expect(timeAgo(testTime.toISOString())).toBe(
        `${testTime.getDate()} ${testTime.toLocaleDateString("en", {
          month: "short",
        })}`
      );
    });

    test("current time - 1 year => day-month-year", () => {
      const testTime = new Date();
      testTime.setFullYear(testTime.getFullYear() - 1);

      expect(timeAgo(testTime.toISOString())).toBe(
        `${testTime.getDate()} ${testTime.toLocaleDateString("en", {
          month: "short",
        })} ${testTime.getFullYear()}`
      );
    });
  });

  describe("Tests with invalid input", () => {
    test("something wrong => Invalid date format", () => {
      expect(timeAgo("something wrong")).toBe("Invalid date format");
    });

    test("2014-25-23 => Invalid date format", () => {
      expect(timeAgo("2014-25-23")).toBe("Invalid date format");
    });
  });
});
