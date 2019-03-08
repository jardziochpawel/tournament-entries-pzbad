import {
  CLASSIFICATION_LIST_REQUEST,
  CLASSIFICATION_LIST_RECEIVED,
  CLASSIFICATION_LIST_ERROR,
  CLASSIFICATION_LIST_SET_PAGE,
  CLASSIFICATION_LIST_SET_CATEGORY
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  classification: null,
  isFetching: false,
  currentPage: 'SM',
  currentCategory: 'JM',
  pageCount: null
}, action) => {
  switch (action.type) {
    case CLASSIFICATION_LIST_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case CLASSIFICATION_LIST_RECEIVED:
      state = {
        ...state,
        classification: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case CLASSIFICATION_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        classification: null
      };
    case CLASSIFICATION_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    case CLASSIFICATION_LIST_SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      };
    default:
      return state;
  }
}
