import debounce from "./debounce";

jest.useFakeTimers();

describe("debounce unit", () => {
  test("Debounced callback should be called once", () => {
    const callback = jest.fn();

    const _debounce = debounce(callback, 1000);

    for (let index = 0; index < 100; index++) {
      _debounce();
    }

    jest.runAllTimers();

    expect(callback).toBeCalledTimes(1);
  });
});
