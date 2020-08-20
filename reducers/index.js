import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {},
};

export const loginAction = (data) => {
  return { type: "LOG_IN", data };
};

export const logoutAction = {
  type: "LOG_OUT",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return { ...state, ...action.payload };
    case "LOG_IN":
      return {
        ...state,
        user: { ...state.user, user: action.data, isLoggedIn: true },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: { ...state.user, user: null, isLoggedIn: false },
      };
    // default는 무조건 해줘야 한다. 그 이유는 리듀서 초기화할때 이 스위치문이 실행되기 때문에 default는 반드시 있어야함.
    default:
      return state;
  }
};

export default rootReducer;
