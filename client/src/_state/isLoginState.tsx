import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const isLoginState = atom({
  key: "isLoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default isLoginState;
