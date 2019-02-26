import {
  CLUB_LIST_ERROR,
  CLUB_LIST_RECEIVED,
  CLUB_LIST_REQUEST,
  CLUB_LIST_SET_PAGE,
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  clubs: null,
  isFetching: false,
  currentPage: 1,
  pageCount: null
}, action) => {

  switch (action.type) {
    case CLUB_LIST_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case CLUB_LIST_RECEIVED:
      state = {
        ...state,
        clubs: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case CLUB_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        clubs: null
      };
    case CLUB_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}
