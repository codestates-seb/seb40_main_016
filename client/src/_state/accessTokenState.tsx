import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const accessTokenState = atom({
  key: "accessTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default accessTokenState;
