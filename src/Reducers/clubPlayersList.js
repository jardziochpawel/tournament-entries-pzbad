import {
  COMMENT_ADDED,
  CLUB_PLAYERS_LIST_ERROR,
  CLUB_PLAYERS_LIST_RECEIVED,
  CLUB_PLAYERS_LIST_REQUEST,
  CLUB_PLAYERS_LIST_SET_PAGE
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";
export default (state = {
  clubPlayersList: null,
  isFetching: false,
  currentPage: 1,
  pageCount: null
}, action) => {
  switch (action.type) {
    case CLUB_PLAYERS_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CLUB_PLAYERS_LIST_RECEIVED:
      return {
        ...state,
        clubPlayersList: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
    case COMMENT_ADDED:
      return {
        ...state,
        clubPlayersList: [action.comment, ...state.clubPlayersList]
      };
    case CLUB_PLAYERS_LIST_ERROR:
    case CLUB_PLAYERS_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}
