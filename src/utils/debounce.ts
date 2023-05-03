const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function perform(...args: Parameters<T>) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default debounce;
