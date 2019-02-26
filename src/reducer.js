import {combineReducers} from "redux";
import playersList from "./Reducers/playersList";
import club from "./Reducers/club";
import clubPlayersList from "./Reducers/clubPlayersList";
import {reducer as formReducer} from 'redux-form';
import auth from "./Reducers/auth";
import clubsList from "./Reducers/clubsList"
import {routerReducer} from "react-router-redux";
import registration from "./Reducers/registration";
import blogPostForm from "./Reducers/blogPostForm";

export default combineReducers({
  playersList,
  club,
  clubPlayersList,
  auth,
  registration,
  blogPostForm,
  clubsList,
  router: routerReducer,
  form: formReducer
});
