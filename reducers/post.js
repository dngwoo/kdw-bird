import { produce } from 'immer';

const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,

  retweetLoading: false,
  retweetDone: false,
  retweetError: null,

  uploadPostLoading: false,
  uploadPostDone: false,
  uploadPostError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  UnlikePostLoading: false,
  UnlikePostDone: false,
  UnlikePostError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

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

// export const generateDummyPost = (number) => Array(number).fill().map(()=>({
//       id: shortId.generate(),
//       User: {
//         id:shortId.generate(),
//         nickname: faker.name.findName()
//       },
//       content: faker.lorem.paragraph(),
//       Images: [{
//         src: faker.image.image()
//       }],
//       Comments: [{
//         id:shortId.generate(),
//         User:{
//           id: shortId.generate(),
//           nickname: faker.name.findName()
//         },
//         content: faker.lorem.sentence()
//       }]
// }));

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// const dummyPost = (data) => ({
//   id: data.id,
//   User: {
//     id: 1,
//     nickname: '김동우',
//   },
//   content: data.content,
//   Images: [],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: shortId.generate(),
//   User: {
//     id: shortId.generate(),
//     nickname: '김동우',
//   },
//   content: data,
// });

// 이전상태를 액션을 통해 다음 상태로 만들어내는 함수.
// 단 불변성은 지켜야함.
const reducer = (state = initialState, action) => produce(state, (draft)=> {
    // immer는 알아서 다음상태로 만들어준다.
    switch (action.type) {
        // add retweet
        case RETWEET_REQUEST:
            draft.retweetLoading = true;
            draft.retweetDone = false;
            draft.retweetError = null;
            break;
        case RETWEET_SUCCESS: 
            draft.retweetLoading = false;
            draft.retweetDone = true;
            draft.mainPosts.unshift(action.data);
            break;
        case RETWEET_FAILURE:
            draft.retweetLoading = false;          
            draft.retweetError = action.error;
            break;

        
        // 이미지 삭제
        case REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v,i)=> i!== action.data);
            break;

        // 좋아요 추가
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading = true;
            draft.uploadImagesDone = false;
            draft.uploadImagesError = null;
            break;
        case UPLOAD_IMAGES_SUCCESS: {
            draft.imagePaths = action.data;
            draft.uploadImagesLoading = false;
            draft.uploadImagesDone = true;
            break;
        }
        case UPLOAD_IMAGES_FAILURE:
            draft.uploadImagesLoading = false;          
            draft.uploadImagesError = action.error;
            break;

        // 좋아요 추가
        case LIKE_POST_REQUEST:
            draft.likePostLoading = true;
            draft.likePostDone = false;
            draft.likePostError = null;
            break;
        case LIKE_POST_SUCCESS: {
            const post = draft.mainPosts.find(v=> v.id === action.data.PostId); // 해당 포스터 찾기
            post.Likers.push({id: action.data.UserId}); // Likers에 누가 좋아요 눌렀는 지 넣기
            draft.likePostLoading = false;
            draft.likePostDone = true;
            break;
        }
        case LIKE_POST_FAILURE:
            draft.likePostLoading = false;          
            draft.likePostError = action.error;
            break;

        // 좋아요 취소
        case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading = true;
            draft.unlikePostDone = false;
            draft.unlikePostError = null;
            break;
        case UNLIKE_POST_SUCCESS: {
            const post = draft.mainPosts.find(v=>v.id === action.data.PostId);
            post.Likers = post.Likers.filter(v=> v.id !== action.data.UserId); // 원래 splite 쓰는것이 좋음
            draft.unlikePostLoading = false;
            draft.unlikePostDone = true;
            break;
        }
        case UNLIKE_POST_FAILURE:
            draft.unlikePostLoading = false;          
            draft.unlikePostError = action.error;
            break;
        

        // add post
        case LOAD_POSTS_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError = null;
            break;
        case LOAD_POSTS_SUCCESS:
            draft.mainPosts = action.data.concat(draft.mainPosts);
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            draft.hasMorePosts = draft.mainPosts.length < 50;
            break;
        case LOAD_POSTS_FAILURE:
            draft.loadPostLoading = false;          
            draft.loadPostError = action.error;
            break;

        // add post
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;
        case ADD_POST_SUCCESS:
            draft.mainPosts.unshift(action.data); 
            draft.addPostLoading = false;
            draft.addPostDone = true;
            draft.imagePaths = []; // 포스트 추가 하고 초기화해줘야 PostForm에 이미지가 사라짐.
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
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Comments.unshift(action.data);
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
