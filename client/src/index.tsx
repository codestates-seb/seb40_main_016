import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

import App from "./App";
import GlobalStyles from "./assets/style/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
