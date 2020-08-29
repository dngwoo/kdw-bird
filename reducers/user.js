const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,

  logOutLoading: false, // 로그 아웃 시도중
  logOutDone: false,
  logOutError: null,

  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,

  changeNicknameLoading: false, // 닉네임 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,

  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  // me에 들어가는 더미데이터
  ...data,
  id:1,
  nickname: '우동우',
  Posts: [],
  Followings: [{nickname: '부기초1'},{nickname: '부기초2'},{nickname: '부기초3'},{nickname: '부기초4'}],
  Followers: [{nickname: '부기초1'},{nickname: '부기초2'},{nickname: '부기초3'}],
});

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => ({ type: LOG_IN_REQUEST, data });
export const logoutRequestAction = { type: LOG_OUT_REQUEST };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 규칙성이 보임.
    // Request 에서는 login 관련된 state 3개를 초기화 (성공할지 실패할지 모르기 때문)
    // Success, Failure은 상황에 맞게 state 값을 바꿔준다.

    // login
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data), // data 안에는 {email:..., password: ...} 가 들어있음.
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };

    // logout
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return { ...state, logOutLoading: false, logOutDone: true, me: null };
    case LOG_OUT_FAILURE:
      return { ...state, logOutLoading: false, logOutError: action.error };

    // signup
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return { ...state, signUpLoading: false, signUpDone: true, me: null };
    case SIGN_UP_FAILURE:
      return { ...state, signUpLoading: false, signUpError: action.error };

    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        ChangeNickNameLoading: true,
        ChangeNickNameDone: false,
        ChangeNickNameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return { ...state, changeNickNameLoading: false, changeNickNameDone: true, me: null };
    case CHANGE_NICKNAME_FAILURE:
      return { ...state, changeNickNameLoading: false, changeNickNameError: action.error };  

    // 포스트 추가한것 user에 추가
    case ADD_POST_TO_ME:
      return { ...state, me: { ...state.me, Posts: [{id :  action.data}, ...state.me.Posts]} };  

    // default
    default:
      return { ...state };
  }
};

export default reducer;
