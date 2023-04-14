// dataParam example: "2021-04-13T10:22:22.000Z"

function timeAgo(dateParam: string) {
  const date = new Date(dateParam);
  const today = new Date();

  const seconds = Math.round((today.valueOf() - date.valueOf()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / (60 * 60));
  const days = Math.round(seconds / (60 * 60 * 7));
  const years = Math.round(seconds / 31_536_000);

  const day = date.getDate();
  const weekDayName = date.toLocaleDateString("en", { weekday: "short" });
  const month = date.toLocaleDateString("en", { month: "short" });
  const year = date.getFullYear();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 2) {
    return "an hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return weekDayName;
  } else if (days >= 7 && years < 1) {
    return `${day} ${month}`;
  }

  return `${day} ${month} ${year}`;
}

export default timeAgo;
