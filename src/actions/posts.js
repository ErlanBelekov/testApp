import {
  FETCH_USER_POSTS,
  FETCH_USER_POSTS_BEGIN,
  FETCH_USER_POSTS_ERROR,
} from './types';
import { fetchPostsOfUser } from '../api/posts';

export const loadUserPosts = (userID) => async (dispatchEvent) => {
  dispatchEvent({
    type: FETCH_USER_POSTS_BEGIN,
  });

  const userPosts = await fetchPostsOfUser(userID);

  if (userPosts instanceof Error) {
    dispatchEvent({
      type: FETCH_USER_POSTS_ERROR,
      payload: userPosts.message,
    });
    return;
  }

  dispatchEvent({
    type: FETCH_USER_POSTS,
    payload: userPosts,
  });
};

export const setUserPosts = (posts) => ({
  type: FETCH_USER_POSTS,
  payload: posts,
});
