import {
  LAST_SEASON_RECEIVED,
  LAST_SEASON_REQUEST,
  LAST_SEASON_ERROR
} from "../Actions/constants";

export default(state = {
  lastSeason: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case LAST_SEASON_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case LAST_SEASON_RECEIVED:
      state = {
        ...state,
        lastSeason: action.data,
        isFetching: false
      };
      return state;
    case LAST_SEASON_ERROR:
      return {
        ...state,
        isFetching: false,
        lastSeason: null
      };
    default:
      return state;
  }
}
