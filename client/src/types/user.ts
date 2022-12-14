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

export interface LoginInfo {
  email: string;
  password: string;
}

export interface EditProfileInfo {
  userName: string;
  content?: string;
  userImg?: string;
  userBirth?: string;
  userType?: "PERSON" | "CAT" | "DOG" | "";
}

export interface UserInfo {
  content: string;
  createdAt: string;
  followCnt: number;
  followerCnt: number;
  userBirth: string;
  userGender: "MALE" | "FEMALE";
  userId: number;
  userImg: string;
  userName: string;
  userStatus: string;
  userType: "PERSON" | "CAT" | "DOG";
}
