const FilterDecimalZero = (rest: number) => {
  if (rest !== 0) {
    return "." + rest;
  } else {
    return "";
  }
};

const ShortenNumber = (count: number) => {
  if (count === 0) {
    return 0;
  } else if (count < 1000) {
    return count;
  } else if (count >= 1000 && count < 1000000) {
    return Math.floor(count / 1000) + FilterDecimalZero(Math.floor((count % 1000) / 100)) + "K";
  } else if (count >= 1000000 && count < 1000000000) {
    return Math.floor(count / 1000000) + FilterDecimalZero(Math.floor((count % 1000000) / 100000)) + "M";
  } else if (count >= 1000000000) {
    return count / 1000000000 + "B";
  }
};

export default ShortenNumber;
