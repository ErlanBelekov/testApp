import { BASE_API } from '../constants';

export const fetchCommentsForPost = async (postID) => {
  const postComments = await fetch(`${BASE_API}/posts/${postID}/comments`)
    .then((res) => res.json())
    .catch((e) => e);

  return postComments;
};
