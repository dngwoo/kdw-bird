import {produce} from 'immer';

const initialState = {

  RemoveFollowerLoading: false, // 팔로우 삭제 시도중
  RemoveFollowerDone: false,
  RemoveFollowerError: null,

  loadFollowersLoading: false, // 팔로우 가져오기 시도중
  loadFollowersDone: false,
  loadFollowersError: null,

  loadFollowingsLoading: false, // 팔로잉 가져오기 시도중
  loadFollowingsDone: false,
  loadFollowingsError: null,

  loadMyInfoLoading: false, // 내 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,

  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,

  unFollowLoading: false, // 언팔로우 시도중
  unFollowDone: false,
  unFollowError: null,

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

// const dummyUser = (data) => ({
//   // me에 들어가는 더미데이터
//   ...data,
//   id:1,
//   nickname: '우동우',
//   Posts: [],
//   Followings: [],
//   Followers: [],
// });

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWERS_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWERS_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

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

export const loginRequestAction = (data) => ({ type: LOG_IN_REQUEST, data }); // data: {email: '...',password: '...'}
export const logoutRequestAction = { type: LOG_OUT_REQUEST };

const reducer = (state = initialState, action) => produce(state, (draft)=>{
    switch (action.type) {
      // 규칙성이 보임.
      // Request 에서는 login 관련된 state 3개를 초기화 (성공할지 실패할지 모르기 때문)
      // Success, Failure은 상황에 맞게 state 값을 바꿔준다.
      //removeFollowers
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = null;
        break;
      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        draft.me.Followers = draft.me.Followers.filter(v=>v.id !== action.data.UserId);
        break;
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false,
        draft.removeFollowerError = action.error;
        break;

      //loadFollowers
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.me.Followers = action.data;
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false,
        draft.loadFollowersError = action.error;
        break;

      //loadFollowings
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.me.Followings = action.data;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false,
        draft.loadFollowingsError = action.error;
        break;

      //loadMyInfo
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data; 
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false,
        draft.loadMyInfoError = action.error;
        break;

      //follow
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({id: action.data.UserId});
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false,
        draft.followError = action.error;
        break;

      //unfollow
      case UNFOLLOW_REQUEST:
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unFollowLoading = false;
        draft.unFollowDone = true;
        // 원래는 불변성을 안지키기 위해서 splice 사용하는게 맞음
        draft.me.Followings = draft.me.Followings.filter(v=> v.id !== action.data.UserId); 
        break;
      case UNFOLLOW_FAILURE:
        draft.unFollowLoading = false,
        draft.unFollowError = action.error;
        break;
  
      // login
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data; // data 안에는 {email:..., password: ...} 가 들어있음.
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false,
        draft.logInError = action.error;
        break;
  
      // logout
      case LOG_OUT_REQUEST:
        draft.logOutLoading= true;
        draft.logOutDone=false;
        draft.logOutError= null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false; 
        draft.logOutDone = true;
        draft.me = null; 
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false; 
        draft.logOutError = action.error; 
        break;

      // signup
      case SIGN_UP_REQUEST:   
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false; 
        draft.signUpDone = true; 
        draft.me = null; 
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false; 
        draft.signUpError = action.error; // response.data.error
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.ChangeNickNameLoading = true;
        draft.ChangeNickNameDone = false;
        draft.ChangeNickNameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNickNameLoading = false; 
        draft.changeNickNameDone = true; 
        draft.me.nickname = action.data.nickname;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNickNameLoading = false; 
        draft.changeNickNameError = action.error; 
        break;
      // 포스트 추가한것 user에 추가
      case ADD_POST_TO_ME:
        // action.data는 sagas/post.js에서 만든 shortId. 실제에서는 해당 post의 id가 됨.
        draft.me.Posts.unshift({id: action.data});
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: [{ id: action.data }, ...state.me.Posts],
        //   },
        // };
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data.PostId);
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
        //   },
        // };
        
  
      // default
      default:
        break;
    }
  });
  


export default reducer;
