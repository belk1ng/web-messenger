const sentAt = (date: string) => {
  const _date = new Date(date);

  return `${catchSingleCharacter(_date.getHours())}:${catchSingleCharacter(
    _date.getMinutes()
  )}`;
};

const catchSingleCharacter = (letter: number) =>
  String(letter).length === 2 ? letter : `0${letter}`;

export default sentAt;
