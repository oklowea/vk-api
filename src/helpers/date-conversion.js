export default function dateConversion(dateInMs) {
  const date = new Date(dateInMs * 1000);
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
