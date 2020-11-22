import { BASE_API } from '../constants';
import { FETCH_USER_DATA } from './types';

export const loadUserData = (userID) => async (dispatchEvent) => {
  const userData = await fetch(`${BASE_API}/users/${userID}`)
    .then((res) => res.json())
    .catch((e) => e);

  dispatchEvent({
    type: FETCH_USER_DATA,
    payload: userData,
  });
};
