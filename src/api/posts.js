import { BASE_API } from '../constants';

export const fetchPostsOfUser = async (userID) => {
  const userPosts = await fetch(`${BASE_API}/users/${userID}/posts`)
    .then((res) => res.json())
    .catch((e) => e);

  return userPosts;
};
