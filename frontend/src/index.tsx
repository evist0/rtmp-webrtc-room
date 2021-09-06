import React from "react";
import ReactDOM from "react-dom";
import { MobxRouter } from "mobx-router";
import store from "./mobx/store";
import { StoreProvider } from "./context/store-context";
import { GlobalStyles } from "./styles";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />

    <StoreProvider value={store}>
      <MobxRouter store={store} />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
