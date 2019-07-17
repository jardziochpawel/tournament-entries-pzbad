import {LAST_SEASON_RECEIVED, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR} from "./Actions/constants";
import {requests} from "./agent";
import {userLogout} from "./Actions/actions";

export const tokenMiddleware = store => next => action => {

  switch (action.type) {
    case LAST_SEASON_RECEIVED:
      window.localStorage.setItem('lastSeason', action.data.last_season);
      requests.setSeason(action.data.last_season);
      break;
    case USER_LOGIN_SUCCESS:
      window.localStorage.setItem('jwtToken', action.token);
      window.localStorage.setItem('userId', action.userId);
      requests.setToken(action.token);
      break;
    case USER_LOGOUT:
      window.localStorage.removeItem('jwtToken');
      window.localStorage.removeItem('userId');
      requests.setToken(null);
      break;
    case USER_PROFILE_ERROR:
      const state = store.getState().auth;
      if (state.userId === action.userId && state.userData === null) {
        store.dispatch(userLogout());
      }
      break;
    default:
  }

  next(action);
};
