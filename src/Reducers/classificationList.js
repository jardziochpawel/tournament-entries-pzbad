import {
  CLASSIFICATION_LIST_REQUEST,
  CLASSIFICATION_LIST_RECEIVED,
  CLASSIFICATION_LIST_CLEAR,
  CLASSIFICATION_LIST_ERROR,
  CLASSIFICATION_LIST_SET_TYPE_OF_GAME,
  CLASSIFICATION_LIST_SET_CATEGORY
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  classification: null,
  isFetching: false,
  currentTypeOfGame: 'SM',
  currentCategory: 1,
  pageCount: null
}, action) => {
  switch (action.type) {
    case CLASSIFICATION_LIST_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case CLASSIFICATION_LIST_CLEAR:
      state = {
        ...state,
          isFetching: true,
        classification: null,
      };
      return state;
    case CLASSIFICATION_LIST_RECEIVED:
      state = {
        ...state,
        classification: action.data,
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
    case CLASSIFICATION_LIST_SET_TYPE_OF_GAME:
      return {
        ...state,
        currentTypeOfGame: action.page
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
