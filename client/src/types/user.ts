export interface SignupUserInfo {
  [index: string]: string;
  userName: string;
  email: string;
  password: string;
  content: string;
  userGender: "male" | "female";
  userImg: string;
  userType: "person" | "cat" | "dog" | "";
  userBirth: string;
}
