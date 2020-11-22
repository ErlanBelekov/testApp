import {
  FETCH_USER_DATA,
  FETCH_USER_POSTS,
  FETCH_USER_POSTS_BEGIN,
  FETCH_USER_POSTS_ERROR,
} from '../../actions/types';

const initialState = {
  posts: [],
  isLoadingUserPosts: false,
  userPostsLoadError: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_USER_POSTS_BEGIN:
      return {
        ...state,
        posts: [],
        isLoadingUserPosts: true,
        userPostsLoadError: '',
      };
    case FETCH_USER_POSTS:
      return {
        ...state,
        isLoadingUserPosts: false,
        userPostsLoadError: '',
        posts: action.payload,
      };
    case FETCH_USER_POSTS_ERROR:
      return {
        ...state,
        posts: [],
        isLoadingUserPosts: false,
        userPostsLoadError: action.payload,
      };
    default:
      return state;
  }
}
