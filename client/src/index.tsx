import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./style/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
);
