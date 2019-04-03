import {COMMON_ERROR, COMMON_RECEIVED, COMMON_REQUEST, COMMON_UNLOAD} from "../Actions/constants";

export default (state = {
  common: null,
  isFetching: false
}, action) => {
  switch (action.type) {
    case COMMON_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case COMMON_RECEIVED:
      return {
        ...state,
        common: action.data,
        isFetching: false
      };
    case COMMON_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case COMMON_UNLOAD:
      return {
        ...state,
        isFetching: false,
        common: null
      };
    default:
      return state;
  }
}
