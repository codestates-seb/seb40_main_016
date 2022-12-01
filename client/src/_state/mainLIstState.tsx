import { atom } from "recoil";

const mainListState = atom({
  key: "mainListState",
  default: [],
  dangerouslyAllowMutability: true,
});

export default mainListState;
