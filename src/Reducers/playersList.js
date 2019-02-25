import {
  PLAYERS_LIST_REQUEST,
  BLOG_POST_LIST_ADD,
  PLAYERS_LIST_RECEIVED,
  PLAYERS_LIST_ERROR, PLAYERS_LIST_SET_PAGE
} from "../Actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(state = {
  players: null,
  isFetching: false,
  currentPage: 1,
  pageCount: null
}, action) => {
  switch (action.type) {
    case PLAYERS_LIST_REQUEST:
      state = {
        ...state,
        isFetching: true,
      };
      return state;
    case PLAYERS_LIST_RECEIVED:
      state = {
        ...state,
        players: action.data['hydra:member'],
        pageCount: hydraPageCount(action.data),
        isFetching: false
      };
      return state;
    case PLAYERS_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        players: null
      };
    case BLOG_POST_LIST_ADD:
      state = {
        ...state,
        players: state.players ? state.players.concat(action.data) : state.players
      };
      return state;
    case PLAYERS_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}
