import {requests} from "../agent";
import {
  BLOG_POST_FORM_UNLOAD,
  PLAYERS_LIST_ERROR,
  PLAYERS_LIST_RECEIVED,
  PLAYERS_LIST_REQUEST,
  PLAYERS_LIST_SET_PAGE,
  CLUB_ERROR,
  CLUB_RECEIVED,
  CLUB_REQUEST,
  CLUB_UNLOAD,
  TOURNAMENT_ERROR,
  TOURNAMENT_RECEIVED,
  TOURNAMENT_REQUEST,
  TOURNAMENT_UNLOAD,
  COMMENT_ADDED,
  CLUB_PLAYERS_LIST_ERROR,
  CLUB_PLAYERS_LIST_RECEIVED,
  CLUB_PLAYERS_LIST_REQUEST,
  CLUB_PLAYERS_LIST_SET_PAGE,
  CLUB_LIST_ERROR,
  CLUB_LIST_RECEIVED,
  CLUB_LIST_REQUEST,
  CLUB_LIST_SET_PAGE,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETED,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOADED,
  USER_CONFIRMATION_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_ERROR,
  USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST,
  USER_REGISTER_COMPLETE,
  USER_REGISTER_SUCCESS,
  USER_SET_ID,
  TOURNAMENTS_LIST_REQUEST,
  TOURNAMENTS_LIST_ERROR,
  TOURNAMENTS_LIST_RECEIVED,
  TOURNAMENTS_LIST_SET_PAGE,
  TOURNAMENTS_RESULT_REQUEST,
  TOURNAMENTS_RESULT_ERROR,
  TOURNAMENTS_RESULT_RECEIVED,
  TOURNAMENTS_RESULT_SET_PAGE,
  TOURNAMENTS_RESULT_SET_CATEGORY,
  TOURNAMENTS_RESULT_CHANGE_PAGE,
  CLASSIFICATION_LIST_REQUEST,
  CLASSIFICATION_LIST_CLEAR,
  CLASSIFICATION_LIST_ERROR,
  CLASSIFICATION_LIST_RECEIVED,
  CLASSIFICATION_LIST_SET_TYPE_OF_GAME,
  CLASSIFICATION_LIST_SET_CATEGORY
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

export const playerListRequest = () => ({
  type: PLAYERS_LIST_REQUEST,
});

export const playerListError = (error) => ({
  type: PLAYERS_LIST_ERROR,
  error
});

export const playerListReceived = (data) => ({
  type: PLAYERS_LIST_RECEIVED,
  data
});

export const playerListSetPage = (page) => ({
  type: PLAYERS_LIST_SET_PAGE,
  page
});

export const playerListFetch = (page = 1) => {
  return (dispatch) => {
    dispatch(playerListRequest());
    return requests.get(`/players?_page=${page}`)
      .then(response => dispatch(playerListReceived(response)))
      .catch(error => dispatch(playerListError(error)));
  }
};

export const tournamentsListRequest = () => ({
  type: TOURNAMENTS_LIST_REQUEST,
});

export const tournamentsListError = (error) => ({
  type: TOURNAMENTS_LIST_ERROR,
  error
});

export const tournamentsListReceived = (data) => ({
  type: TOURNAMENTS_LIST_RECEIVED,
  data
});

export const tournamentsListSetPage = (page) => ({
  type: TOURNAMENTS_LIST_SET_PAGE,
  page
});

export const tournamentsListFetch = (page = 1) => {
  return (dispatch) => {
    dispatch(tournamentsListRequest());
    return requests.get('/tournaments?_page='+page)
        .then(response => dispatch(tournamentsListReceived(response)))
        .catch(error => dispatch(tournamentsListError(error)));
  }
};

export const tournamentsResultRequest = () => ({
  type: TOURNAMENTS_RESULT_REQUEST,
});

export const tournamentsResultError = (error) => ({
  type: TOURNAMENTS_RESULT_ERROR,
  error
});

export const tournamentsResultReceived = (data) => ({
  type: TOURNAMENTS_RESULT_RECEIVED,
  data
});

export const tournamentsResultSetPage = (page) => ({
  type: TOURNAMENTS_RESULT_SET_PAGE,
  page
});

export const tournamentsResultChangePage = () => ({
  type: TOURNAMENTS_RESULT_CHANGE_PAGE,
});

export const tournamentsResultSetCategory = (category) => ({
  type: TOURNAMENTS_RESULT_SET_CATEGORY,
  category
});

export const tournamentsResultFetch = (id, typeOfGame = 'SM', category = 'JM') => {
  return (dispatch) => {
    dispatch(tournamentsResultRequest());
    return requests.get('/tournaments/'+id+'/results?itemsPerPage=100&typeOfGame='+typeOfGame+'&playerCategory.pzbadId='+category)
        .then(response => dispatch(tournamentsResultReceived(response)))
        .catch(error => dispatch(tournamentsResultError(error)));
  }
};


export const classificationListRequest = () => ({
  type: CLASSIFICATION_LIST_REQUEST,
});

export const classificationListClear = () => ({
  type: CLASSIFICATION_LIST_CLEAR,
});

export const classificationListError = (error) => ({
  type: CLASSIFICATION_LIST_ERROR,
  error
});

export const classificationListReceived = (data) => ({
  type: CLASSIFICATION_LIST_RECEIVED,
  data
});

export const classificationListSetTypeOfGame = (page) => ({
  type: CLASSIFICATION_LIST_SET_TYPE_OF_GAME,
  page
});

export const classificationListSetCategory = (category) => ({
  type: CLASSIFICATION_LIST_SET_CATEGORY,
  category
});

export const classificationListFetch = (id, typeOfGame = 'SM') => {
  return (dispatch) => {
    dispatch(classificationListRequest());
    return requests.get('/classification/'+id+'/'+typeOfGame)
        .then(response => dispatch(classificationListReceived(response)))
        .catch(error => dispatch(classificationListError(error)));
  }
};

export const clubRequest = () => ({
  type: CLUB_REQUEST,
});

export const clubError = (error) => ({
  type: CLUB_ERROR,
  error
});

export const clubReceived = (data) => ({
  type: CLUB_RECEIVED,
  data
});

export const clubUnload = () => ({
  type: CLUB_UNLOAD,
});

export const clubFetch = (id) => {
  return (dispatch) => {
    dispatch(clubRequest());
    return requests.get(`/clubs/${id}`)
      .then(response => dispatch(clubReceived(response)))
      .catch(error => dispatch(clubError(error)));
  }
};

export const tournamentRequest = () => ({
  type: TOURNAMENT_REQUEST,
});

export const tournamentError = (error) => ({
  type: TOURNAMENT_ERROR,
  error
});

export const tournamentReceived = (data) => ({
  type: TOURNAMENT_RECEIVED,
  data
});

export const tournamentFetch = (id) => {
  return (dispatch) => {
    dispatch(tournamentRequest());
    return requests.get(`/tournaments/${id}`)
      .then(response => dispatch(tournamentReceived(response)))
      .catch(error => dispatch(tournamentError(error)));
  }
};

export const clubListRequest = () => ({
  type: CLUB_LIST_REQUEST,
});

export const clubListError = (error) => ({
  type: CLUB_LIST_ERROR,
  error
});

export const clubListReceived = (data) => ({
  type: CLUB_LIST_RECEIVED,
  data
});

export const clubListSetPage = (page) => ({
  type: CLUB_LIST_SET_PAGE,
  page
});

export const clubListFetch = (page) => {
  return (dispatch) => {
    dispatch(clubListRequest());
    return requests.get('/clubs?_page='+page)
      .then(response => dispatch(clubListReceived(response)))
      .catch(error => dispatch(clubListError(error)));
  }
};

export const blogPostAdd = (title, content, images = []) => {
  return (dispatch) => {
    return requests.post(
      '/blog_posts',
      {
        title,
        content,
        slug: title && title.replace(/ /g, "-").toLowerCase(),
        images: images.map(image => `/api/images/${image.id}`)
      }
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      } else if (403 === error.response.status) {
        throw new SubmissionError({
          _error: 'You do not have rights to publish blog posts!'
        });
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const blogPostFormUnload = () => ({
  type: BLOG_POST_FORM_UNLOAD
});

export const clubPlayersListRequest = () => ({
  type: CLUB_PLAYERS_LIST_REQUEST,
});

export const clubPlayersListError = (error) => ({
  type: CLUB_PLAYERS_LIST_ERROR,
  error
});

export const clubPlayersListReceived = (data) => ({
  type: CLUB_PLAYERS_LIST_RECEIVED,
  data
});

export const clubPlayerListSetPage = (page) => ({
  type: CLUB_PLAYERS_LIST_SET_PAGE,
  page
});

export const clubPlayersListFetch = (id, page = 1) => {
  return (dispatch) => {
    dispatch(clubPlayersListRequest());
    return requests.get('/clubs/'+id+'/players?_page='+page)
      .then(response => dispatch(clubPlayersListReceived(response)))
      .catch(error => dispatch(clubPlayersListError(error)));
  }
};

export const commentAdded = (comment) => ({
  type: COMMENT_ADDED,
  comment
});

export const commentAdd = (comment, blogPostId) => {
  return (dispatch) => {
    return requests.post(
      '/comments',
      {
        content: comment,
        blogPost: `/api/blog_posts/${blogPostId}`
      }
    ).then(
      response => dispatch(commentAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId
  }
};

export const userLoginAttempt = (username, password) => {
  return (dispatch) => {
    return requests.post('/login_check', {username, password}, false).then(
      response => dispatch(userLoginSuccess(response.token, response.id))
    ).catch(() => {
      throw new SubmissionError({
        _error: 'Username or password is invalid'
      })
    });
  }
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
};

export const userRegisterSuccess = () => {
  return {
    type: USER_REGISTER_SUCCESS
  }
};

export const userRegister = (username, password, retypedPassword, email, name) => {
  return (dispatch) => {
    return requests.post('/users', {username, password, retypedPassword, email, name}, false)
      .then(() => dispatch(userRegisterSuccess()))
      .catch(error => {
        throw new SubmissionError(parseApiErrors(error));
      });
  }
};

export const userConfirmationSuccess = () => {
  return {
    type: USER_CONFIRMATION_SUCCESS
  }
};

export const userRegisterComplete = () => {
  return {
    type: USER_REGISTER_COMPLETE
  }
};

export const userConfirm = (confirmationToken) => {
  return (dispatch) => {
    return requests.post('/users/confirm', {confirmationToken}, false)
      .then(() => dispatch(userConfirmationSuccess()))
      .catch(error => {
        throw new SubmissionError({
          _error: 'Confirmation token is invalid'
        });
      });
  }
};

export const userSetId = (userId) => {
  return {
    type: USER_SET_ID,
    userId
  }
};

export const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST
  }
};

export const userProfileError = (userId) => {
  return {
    type: USER_PROFILE_ERROR,
    userId
  }
};

export const userProfileReceived = (userId, userData) => {
  return {
    type: USER_PROFILE_RECEIVED,
    userData,
    userId
  }
};

export const userProfileFetch = (userId) => {
  return (dispatch) => {
    dispatch(userProfileRequest());
    return requests.get(`/users/${userId}`, true).then(
      response => dispatch(userProfileReceived(userId, response))
    ).catch(() => dispatch(userProfileError(userId)))
  }
};

export const imageUploaded = (data) => {
  return {
    type: IMAGE_UPLOADED,
    image: data
  }
};

export const imageUploadRequest = () => {
  return {
    type: IMAGE_UPLOAD_REQUEST,
  }
};

export const imageUploadError = () => {
  return {
    type: IMAGE_UPLOAD_ERROR,
  }
};

export const imageUpload = (file) => {
  return (dispatch) => {
    dispatch(imageUploadRequest());
    return requests.upload('/images', file)
      .then(response => dispatch(imageUploaded(response)))
      .catch(() => dispatch(imageUploadError))
  }
};

export const imageDeleteRequest = () => {
  return {
    type: IMAGE_DELETE_REQUEST,
  }
};

export const imageDelete = (id) => {
  return (dispatch) => {
    dispatch(imageDeleteRequest());
    return requests.delete(`/images/${id}`)
      .then(() => dispatch(imageDeleted(id)));
  }
};

export const imageDeleted = (id) => {
  return {
    type: IMAGE_DELETED,
    imageId: id
  }
};
