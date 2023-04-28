function timeAgo(dateParam: string) {
  const date = new Date(dateParam);

  if (date.toString() === "Invalid Date") {
    return "Invalid date format";
  }

  const today = new Date();

  const seconds = Math.round((today.valueOf() - date.valueOf()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const years = Math.round(days / (date.getFullYear() % 4 === 0 ? 366 : 365));

  const day = date.getDate();
  const weekDayName = date.toLocaleDateString("en", { weekday: "short" });
  const month = date.toLocaleDateString("en", { month: "short" });
  const year = date.getFullYear();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 120) {
    return "a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 2) {
    return "an hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days <= 7) {
    return weekDayName;
  } else if (days > 7 && years < 1) {
    return `${day} ${month}`;
  }

  return `${day} ${month} ${year}`;
}

export default timeAgo;
