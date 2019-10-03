import {
  CURRENT_SEASON_RECEIVED,
  CURRENT_SEASON_REQUEST,
  CURRENT_SEASON_ERROR
} from "../Actions/constants";

export default(state = {
  currentSeason: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case CURRENT_SEASON_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case CURRENT_SEASON_RECEIVED:
      state = {
        ...state,
        currentSeason: action.data ? action.data.current_season : action.data,
        isFetching: false
      };
      return state;
    case CURRENT_SEASON_ERROR:
      return {
        ...state,
        isFetching: false,
        currentSeason: null
      };
    default:
      return state;
  }
}
