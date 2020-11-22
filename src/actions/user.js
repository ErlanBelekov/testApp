import { BASE_API } from '../constants';
import { FETCH_USER_DATA } from './types';
import { fetchUserData } from '../api/user';

export const loadUserData = (userID) => async (dispatchEvent) => {
  const userData = await fetchUserData(userID);

  dispatchEvent({
    type: FETCH_USER_DATA,
    payload: userData,
  });
};
