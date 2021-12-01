export default function dateConversion(dateInMs) {
  const date = new Date(dateInMs * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}
