import {
  PLAYER_CATEGORIES_ERROR,
  PLAYER_CATEGORIES_RECEIVED,
  PLAYER_CATEGORIES_REQUEST,
  PLAYER_CATEGORIES_SET_PAGE,
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  playerCategories: null,
  isFetching: false,
  currentPage: 1,
  pageCount: null
}, action) => {

  switch (action.type) {
    case PLAYER_CATEGORIES_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case PLAYER_CATEGORIES_RECEIVED:
      state = {
        ...state,
        playerCategories: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case PLAYER_CATEGORIES_ERROR:
      return {
        ...state,
        isFetching: false,
        playerCategories: null
      };
    case PLAYER_CATEGORIES_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}
