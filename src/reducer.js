import {combineReducers} from "redux";
import playersList from "./Reducers/playersList";
import club from "./Reducers/club";
import commentList from "./Reducers/commentList";
import {reducer as formReducer} from 'redux-form';
import auth from "./Reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./Reducers/registration";
import blogPostForm from "./Reducers/blogPostForm";

export default combineReducers({
  playersList,
  club,
  commentList,
  auth,
  registration,
  blogPostForm,
  router: routerReducer,
  form: formReducer
});
