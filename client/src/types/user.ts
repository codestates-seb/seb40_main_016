export interface SignupUserInfo {
  [index: string]: string;
  userName: string;
  email: string;
  password: string;
  content: string;
  userGender: "male" | "female";
  userType: "person" | "cat" | "dog" | "";
  userBirth: string;
}
