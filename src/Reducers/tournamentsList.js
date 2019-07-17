import {
  TOURNAMENTS_LIST_REQUEST,
  TOURNAMENTS_LIST_RECEIVED,
  TOURNAMENTS_LIST_ERROR,
  TOURNAMENTS_LIST_SET_PAGE,
  TOURNAMENTS_CALENDAR_SET_CATEGORY,
  TOURNAMENTS_LIST_SET_SEASON
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  tournaments: null,
  isFetching: false,
  currentPage: 1,
  currentCategory: '',
  currentSeason: 1,
  pageCount: null
}, action) => {
  switch (action.type) {
    case TOURNAMENTS_LIST_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case TOURNAMENTS_LIST_RECEIVED:
      state = {
        ...state,
        tournaments: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case TOURNAMENTS_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        tournaments: null
      };
    case TOURNAMENTS_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    case TOURNAMENTS_CALENDAR_SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      };
    case TOURNAMENTS_LIST_SET_SEASON:
      return {
        ...state,
        currentSeason: action.season
      };
    default:
      return state;
  }
}
