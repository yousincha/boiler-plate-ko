// index.js
import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"; // configureStore를 임포트
import ReduxThunk from "redux-thunk";
import rootReducer from "./_reducers"; // rootReducer로 변경
import { createRoot } from "react-dom/client"; // createRoot를 react-dom/client에서 임포트

// Redux Toolkit의 configureStore 함수로 스토어 생성
const store = configureStore({
  reducer: rootReducer, // rootReducer를 설정
  middleware: [ReduxThunk], // Redux Thunk 미들웨어 적용
  devTools: process.env.NODE_ENV !== "production", // 개발 환경에서만 Redux DevTools 사용
});

const root = createRoot(document.getElementById("root")); // createRoot 사용
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
