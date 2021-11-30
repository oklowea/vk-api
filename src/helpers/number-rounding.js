export default function numberRounding(number) {
  if (number >= 1000 && number <= 10000) {
    return `${Math.floor(number / 100) / 10}К`;
  }

  if (number >= 10000) {
    return `${Math.trunc(number / 1000)}K`;
  }

  return number;
}

// если больше 10К, то выводим единым числом, если меньше 10К, то выводим 7,2 к примеру
