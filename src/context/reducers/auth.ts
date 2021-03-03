import initialState from '../initialstates/authInitialState';
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR, AUTHACTIONTYPES } from '../../constants/actionTypes';

const auth = (state: typeof initialState, action: AUTHACTIONTYPES) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: false,
          loading: true,
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          data: action.payload,
        },
      };

    case LOGIN_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
