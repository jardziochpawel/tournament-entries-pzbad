import {
  SEASON_LIST_RECEIVED,
  SEASON_LIST_REQUEST,
  SEASON_LIST_ERROR
} from "../Actions/constants";

export default(state = {
  seasons: [],
  isFetchingSeason: false
}, action) => {
  switch (action.type) {
    case SEASON_LIST_REQUEST:
      state = {
        ...state,
        isFetchingSeason: true,
      };
      return state;
    case SEASON_LIST_RECEIVED:
      state = {
        ...state,
        seasons: action.data['hydra:member'],
        isFetchingSeason: false
      };
      return state;
    case SEASON_LIST_ERROR:
      return {
        ...state,
        isFetchingSeason: false,
        seasons: null
      };
    default:
      return state;
  }
}
