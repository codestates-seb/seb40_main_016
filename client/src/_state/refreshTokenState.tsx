import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const refreshTokenState = atom({
  key: "refreshTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default refreshTokenState;
