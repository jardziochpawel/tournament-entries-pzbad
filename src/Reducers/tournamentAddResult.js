import {
  BLOG_POST_FORM_UNLOAD,
  IMAGE_DELETE_REQUEST, IMAGE_DELETED, IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_REQUEST, IMAGE_UPLOADED,
  TOURNAMENT_ERROR,
  TOURNAMENT_RECEIVED,
  TOURNAMENT_REQUEST,
  TOURNAMENT_UNLOAD
} from "../Actions/constants";

export default (state = {
  tournament: null,
  isFetching: false,
  imageReqInProgress: false,
  images: []
}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
    case IMAGE_DELETE_REQUEST:
      return {
        ...state,
        imageReqInProgress: true
      };
    case IMAGE_UPLOADED:
      return {
        ...state,
        imageReqInProgress: false,
        images: state.images.concat(action.image)
      };
    case IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        imageReqInProgress: false
      };
    case BLOG_POST_FORM_UNLOAD:
      return {
        ...state,
        imageReqInProgress: false,
        images: []
      };
    case IMAGE_DELETED:
      return {
        ...state,
        images: state.images.filter(image => image.id !== action.imageId),
        imageReqInProgress: false
      };
    case TOURNAMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TOURNAMENT_RECEIVED:
      return {
        ...state,
        tournament: action.data,
        images: action.data.tournamentPlannerCSV,
        isFetching: false
      };
    case TOURNAMENT_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case TOURNAMENT_UNLOAD:
      return {
        ...state,
        isFetching: false,
        tournament: null
      };
    default:
      return state;
  }
}
