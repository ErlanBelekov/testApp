import {
  BEGIN_LOADING_COMMENTS,
  SUCCESS_LOADING_COMMENTS,
  ERROR_LOADING_COMMENTS,
} from './actionTypes';

export const commentInitialState = {
  isLoading: false,
  comments: [],
  errorMsg: '',
};

export const commentReducer = (state, action) => {
  switch (action.type) {
    case BEGIN_LOADING_COMMENTS:
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    case SUCCESS_LOADING_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        comments: action.payload,
      };
    case ERROR_LOADING_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        comments: [],
      };
    default:
      return state;
  }
};
