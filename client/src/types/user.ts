export interface SignupUserInfo {
  [index: string]: string;
  userName: string;
  email: string;
  password: string;
  userGender: "MALE" | "FEMALE";
  userType: "PERSON" | "CAT" | "DOG" | "";
  userBirth: string;
}
export interface SignupPersonInfo {
  [index: string]: string;
  userName: string;
  email: string;
  password: string;
  userType: "PERSON" | "CAT" | "DOG" | "";
}
