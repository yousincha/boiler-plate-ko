// rootReducer.js
import { combineReducers } from "redux";
import userReducer from "./user_reducer"; // userReducer 파일 경로를 올바르게 지정해야 합니다.

const rootReducer = combineReducers({
  user: userReducer, // userReducer를 추가하고 사용할 키를 할당합니다.
  // 다른 리듀서도 필요한 경우 추가 가능
});

export default rootReducer;
