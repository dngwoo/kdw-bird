import shortId from 'shortid';
import { produce } from 'immer';
import faker from 'faker';

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

initialState.mainPosts =  initialState.mainPosts.concat(
  Array(20).fill().map((v,i)=>({
    id: shortId.generate(),
    User: {
      id:shortId.generate(),
      nickname: faker.name.findName()
    },
    content: faker.lorem.paragraph(),
    Images: [{
      src: faker.image.imageUrl()
    }],
    Comments: [{
      id:shortId.generate(),
      User:{
        id: shortId.generate(),
        nickname: faker.name.findName()
      },
      content: faker.lorem.sentence()
    }]
  }))
);

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

// 이전상태를 액션을 통해 다음 상태로 만들어내는 함수.
// 단 불변성은 지켜야함.
const reducer = (state = initialState, action) => produce(state, (draft)=> {
    // immer는 알아서 다음상태로 만들어준다.
    switch (action.type) {
      // add post
      case ADD_POST_REQUEST:
          draft.addPostLoading = true;
          draft.addPostDone = false;
          draft.addPostError = null;
          break;
      case ADD_POST_SUCCESS:
          draft.mainPosts.unshift(dummyPost(action.data)); 
          draft.addPostLoading = false;
          draft.addPostDone = true;
          break;
      case ADD_POST_FAILURE:
          draft.addPostLoading = false;          
          draft.addPostError = action.error;
          break;

        // remove post
      case REMOVE_POST_REQUEST:  
          draft.removePostLoading = true;
          draft.removePostDone = false;
          draft.removePostError = null;
          break;  
      case REMOVE_POST_SUCCESS:
          draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
          draft.removePostLoading = false;
          draft.removePostDone = true;
          break;
        case REMOVE_POST_FAILURE:
          draft.removePostLoading = false;
          draft.removePostError = action.error;
          break;
  
      // add comment
      case ADD_COMMENT_REQUEST: 
          draft.addCommentLoading = true;
          draft.addCommentDone = false;
          draft.addCommentError = null;
          break;
      case ADD_COMMENT_SUCCESS: {         
          const post = draft.mainPosts.find((v) => v.id === action.data.postId);
          post.Comments.unshift(dummyComment(action.data.content));
          draft.addCommentLoading = false;
          draft.addCommentDone = true;
          break;
      // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;
      // return {
      //   ...state,
      //   mainPosts,
      //   addCommentLoading: false,
      //   addCommentDone: true,
      // };
      }
      case ADD_COMMENT_FAILURE:
          draft.addCommentLoading = false;
          draft.addCommentError = action.error;
          break;
  
      // // remove comment
      // case REMOVE_COMMENT_REQUEST:
      //   draft.removeCommentLoading = true;
      //   draft.removeCommentDone = false;
      //   draft.removeCommentError = null;
      //   break;
      // case REMOVE_COMMENT_SUCCESS:
      //   draft.mainPosts.unshift(dummyPost(action.data)) ;
      //   draft.removeCommentLoading = false;
      //   draft.removeCommentDone = true;
      //  break;
      // case REMOVE_COMMENT_FAILURE:
      //   draft.removeCommentLoading = false;
      //   draft.removeCommentError = action.error;
      //   break;

      default:
        break;
    }
  });
 


export default reducer;
