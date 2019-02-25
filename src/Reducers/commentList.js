import {
  COMMENT_ADDED,
  COMMENT_LIST_ERROR,
  COMMENT_LIST_RECEIVED,
  COMMENT_LIST_REQUEST,
  PLAYERS_LIST_SET_PAGE
} from "../Actions/constants";
export default (state = {
  commentList: null,
  isFetching: false,
  currentPage: 1
}, action) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case COMMENT_LIST_RECEIVED:
      return {
        ...state,
        commentList: action.data['hydra:member'],
        isFetching: false
      };
    case COMMENT_ADDED:
      return {
        ...state,
        commentList: [action.comment, ...state.commentList]
      };
    case COMMENT_LIST_ERROR:
    case PLAYERS_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}
