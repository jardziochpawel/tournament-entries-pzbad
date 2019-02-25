import {CLUB_ERROR, CLUB_RECEIVED, CLUB_REQUEST, CLUB_UNLOAD} from "../Actions/constants";

export default (state = {
  club: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case CLUB_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CLUB_RECEIVED:
      return {
        ...state,
        club: action.data,
        isFetching: false
      };
    case CLUB_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case CLUB_UNLOAD:
      return {
        ...state,
        isFetching: false,
        club: null
      };
    default:
      return state;
  }
}
