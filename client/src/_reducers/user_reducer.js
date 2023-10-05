import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

const initialState = {
  loginSuccess: false,
  registerSuccess: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
