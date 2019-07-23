import {
  UPDATE_PLAYERS_LIST_FORM_UNLOAD,
  PLAYERS_LIST_DELETE_REQUEST, PLAYERS_LIST_DELETED, PLAYERS_LIST_UPLOAD_ERROR,
  PLAYERS_LIST_UPLOAD_REQUEST, PLAYERS_LIST_UPLOADED,
} from "../Actions/constants";

export default (state = {
  imageReqInProgress: false,
  images: []
}, action) => {
  switch (action.type) {
    case PLAYERS_LIST_UPLOAD_REQUEST:
    case PLAYERS_LIST_DELETE_REQUEST:
      return {
        ...state,
        imageReqInProgress: true
      };
    case PLAYERS_LIST_UPLOADED:
      return {
        ...state,
        imageReqInProgress: false,
        images: state.images.concat(action.image)
      };
    case PLAYERS_LIST_UPLOAD_ERROR:
      return {
        ...state,
        imageReqInProgress: false
      };
    case UPDATE_PLAYERS_LIST_FORM_UNLOAD:
      return {
        ...state,
        imageReqInProgress: false,
        images: []
      };
    case PLAYERS_LIST_DELETED:
      return {
        ...state,
        images: state.images.filter(image => image.id !== action.imageId),
        imageReqInProgress: false
      };
    default:
      return state;
  }
}
