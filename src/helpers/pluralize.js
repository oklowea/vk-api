export function getChoiceIndex(choice) {
  // i % 10 = 1 and
  // i % 100 != 11
  if (choice % 10 === 1 && choice % 100 !== 11) {
    return 0;
  }

  // i % 10 = 2..4 and
  // i % 100 != 12..14
  if (choice % 10 > 1 && choice % 10 < 5 && !(choice % 100 > 11 && choice % 100 < 15)) {
    return 1;
  }

  // i % 10 = 0 or
  // i % 10 = 5..9 or
  // i % 100 = 11..14
  // eslint-disable-next-line max-len
  if (choice % 10 === 0 || (choice % 10 > 4 && choice % 10 < 10) || (choice % 100 > 10 && choice % 100 < 15)) {
    return 2;
  }

  return 3;
}

export default function pluralize(choice, options) {
  return options[getChoiceIndex(choice)];
}
