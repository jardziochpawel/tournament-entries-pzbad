import {
  TOURNAMENTS_RESULT_REQUEST,
  TOURNAMENTS_RESULT_RECEIVED,
  TOURNAMENTS_RESULT_ERROR,
  TOURNAMENTS_RESULT_SET_PAGE,
  TOURNAMENTS_RESULT_SET_CATEGORY
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  results: null,
  isFetching: false,
  currentPage: 'SM',
  currentCategory: 'JM',
  pageCount: null
}, action) => {
  switch (action.type) {
    case TOURNAMENTS_RESULT_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case TOURNAMENTS_RESULT_RECEIVED:
      state = {
        ...state,
        results: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case TOURNAMENTS_RESULT_ERROR:
      return {
        ...state,
        isFetching: false,
        results: null
      };
    case TOURNAMENTS_RESULT_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    case TOURNAMENTS_RESULT_SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      };
    default:
      return state;
  }
}
