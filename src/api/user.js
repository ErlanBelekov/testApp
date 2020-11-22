import { BASE_API } from '../constants';

export const fetchUserData = async (userID) => {
  const userData = await fetch(`${BASE_API}/users/${userID}`)
    .then((res) => res.json())
    .catch((e) => e);

  return userData;
};
