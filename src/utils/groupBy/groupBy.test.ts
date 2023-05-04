import groupBy from "./groupBy";

describe("groupBy unit", () => {
  describe("Tests with built-in functions", () => {
    test("Should group by Math.floor criteria", () => {
      const grouped = groupBy([6.25, 5.23, 18.9, 3, 1.003, 6.98], Math.floor);

      expect(grouped).toEqual({
        6: [6.25, 6.98],
        5: [5.23],
        18: [18.9],
        3: [3],
        1: [1.003],
      });
    });

    test("Should group by Math.abs criteria", () => {
      const grouped = groupBy([-6, 6], Math.abs);

      expect(grouped).toEqual({
        6: [-6, 6],
      });
    });
  });

  describe("Tests with custom functions", () => {
    test("Should group stamps by date", () => {
      const criteria = (stamp: string) => {
        const date = new Date(stamp);

        return `${date.getDate()} ${date.toLocaleDateString("en", {
          month: "short",
        })}`;
      };

      const grouped = groupBy(
        ["2023-05-03T13:10:06+00:00", "2023-04-24T14:19:42+00:00"],
        criteria
      );

      expect(grouped).toEqual({
        "3 May": ["2023-05-03T13:10:06+00:00"],
        "24 Apr": ["2023-04-24T14:19:42+00:00"],
      });
    });
  });
});
