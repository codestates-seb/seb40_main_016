import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const userInfoState = atom({
  key: "userInfoState",
  default: {
    userId: "",
    userName: "",
    userImg: "",
    userType: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default userInfoState;
