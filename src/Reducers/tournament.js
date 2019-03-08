import {TOURNAMENT_ERROR, TOURNAMENT_RECEIVED, TOURNAMENT_REQUEST, TOURNAMENT_UNLOAD} from "../Actions/constants";

export default (state = {
  tournament: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case TOURNAMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TOURNAMENT_RECEIVED:
      return {
        ...state,
        tournament: action.data,
        isFetching: false
      };
    case TOURNAMENT_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case TOURNAMENT_UNLOAD:
      return {
        ...state,
        isFetching: false,
        tournament: null
      };
    default:
      return state;
  }
}
