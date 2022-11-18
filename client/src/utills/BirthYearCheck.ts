type CheckBirth = (a: string) => boolean;

const isBirthday: CheckBirth = (dateStr) => {
  var year = Number(dateStr.slice(0, 4)); // 입력한 값의 0~4자리까지 (연)
  var today = new Date(); // 날짜 변수 선언
  var yearNow = today.getFullYear(); // 올해 연도 가져옴

  // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
  if (1900 > year || year > yearNow) {
    return false;
  } else {
    return true;
  }
};

export default isBirthday;
