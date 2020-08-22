const initialState = {
  mainPosts: [
    {
      id: 1,
      User: { id: "1", nickname: "김동우" },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheoceanagency.org%2Fresources-1&psig=AOvVaw1CiObsphDkaRocbhTjD7X3&ust=1598104441431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKj83Iy5rOsCFQAAAAAdAAAAABAI",
        },
        {
          src:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheoceanagency.org%2Fresources-1&psig=AOvVaw1CiObsphDkaRocbhTjD7X3&ust=1598104441431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKj83Iy5rOsCFQAAAAAdAAAAABAI",
        },
        {
          src:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftheoceanagency.org%2Fresources-1&psig=AOvVaw1CiObsphDkaRocbhTjD7X3&ust=1598104441431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKj83Iy5rOsCFQAAAAAdAAAAABAI",
        },
      ],
      Comments: [
        {
          User: { nickname: "nero" },
          content: "우와 개정판이 나왔군요~",
        },
        {
          User: { nickname: "hero" },
          content: "얼른 사고 싶어요",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  User: {
    id: 2,
    nickname: "김동우",
  },
  content: "더미데이터입니다.",
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return { ...state };
  }
};

export default reducer;
