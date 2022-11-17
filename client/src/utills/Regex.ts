type CheckRegex = (a: string) => boolean;
//통과하면 true, 부적합하면 false 반환

// 유저네임 정규식 ( 한글, 영문, 숫자 2-10자리)
export const isUserName: CheckRegex = (userName) => {
  return /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(userName);
};

// 이메일 정규식
export const isEmail: CheckRegex = (email) => {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/.test(email);
};

// 비밀번호 정규식 (영문, 숫자 8 ~ 10자리)
export const isPassword: CheckRegex = (password) => {
  return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/.test(password);
};
