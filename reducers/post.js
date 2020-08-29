import shortId from 'shortid';

const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      User: { id: 3, nickname: '김동우' },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          id: shortId.generate(),
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          id: shortId.generate(),
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: { id: shortId.generate(),nickname: 'nero' },
          content: '우와 개정판이 나왔군요~',
        },
        {
          id: shortId.generate(),
          User: { id: shortId.generate(),nickname: 'hero' },
          content: '얼른 사고 싶어요',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: '김동우',
  },
  content: data.content,
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: '김동우',
  },
  content: data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // add post
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

      // remove post
      case REMOVE_POST_REQUEST:
        return {
          ...state,
          removePostLoading: true,
          removePostDone: false,
          removePostError: null,
        };
      case REMOVE_POST_SUCCESS:
        return {
          ...state,
          mainPosts: state.mainPosts.filter(v=>v.id !== action.data),
          removePostLoading: false,
          removePostDone: true,
        };
      case REMOVE_POST_FAILURE:
        return {
          ...state,
          removePostLoading: false,
          removePostError: action.error,
        };

    // add comment
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:{
      // 불변성을 지키기 위해 이렇게 해야 된다. 가독성이 매우 좋지 못하고 불변성 때문에 코딩하기 어렵다.
      // 불변성을 유지하기 위해서는 바뀌는 부분만 새로운 객체로 생성해주고 바뀌지 않는 부분은 얕은 참조로 유지해줘야 한다. <- 매모리 절약을 위해서이다.
      // 이것을 쉽게해줄수있는것이 immer 라이브러리 이다.
      const data = action.data;
      const postIndex = state.mainPosts.findIndex((v)=> v.id === data.postId); // 몇번째 포스트인지 알아내기 위해.
      const post = {...state.mainPosts[postIndex]};
      post.Comments = [dummyComment(data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    // remove comment
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
        removeCommentDone: false,
        removeCommentError: null,
      };
    case REMOVE_COMMENT_SUCCESS:{
      return {
        ...state,
        mainPosts: function(){},
        removeCommentLoading: false,
        removeCommentDone: true,
      };
    }
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentError: action.error,
      };
    default:
      return { ...state };
  }
};

export default reducer;
