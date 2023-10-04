import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

const initialState = {
  loginSuccess: false,
  registerSuccess: false, // 새로운 상태 필드 추가
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };

    default:
      return state;
  }
}
