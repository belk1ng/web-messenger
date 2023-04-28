const sentAt = (stamp: string) => {
  const date = new Date(stamp);

  if (date.toString() !== "Invalid Date") {
    return `${catchSingleCharacter(date.getHours())}:${catchSingleCharacter(
      date.getMinutes()
    )}`;
  }

  return "Invalid date format";
};

const catchSingleCharacter = (letter: number) =>
  String(letter).length === 2 ? letter : `0${letter}`;

console.log(sentAt("wrong"));

export default sentAt;
