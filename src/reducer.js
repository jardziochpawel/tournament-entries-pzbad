import {combineReducers} from "redux";
import playersList from "./Reducers/playersList";
import club from "./Reducers/club";
import tournament from "./Reducers/tournament";
import clubPlayersList from "./Reducers/clubPlayersList";
import {reducer as formReducer} from 'redux-form';
import auth from "./Reducers/auth";
import clubsList from "./Reducers/clubsList"
import classificationList from "./Reducers/classificationList"
import {routerReducer} from "react-router-redux";
import registration from "./Reducers/registration";
import blogPostForm from "./Reducers/blogPostForm";
import tournamentsList from "./Reducers/tournamentsList";
import tournamentResultList from "./Reducers/tournamentResultList";
import registrationTournament from "./Reducers/registrationTournament";
import playerCategories from "./Reducers/playerCategories";
import tournamentAddResult from "./Reducers/tournamentAddResult";
import commons from "./Reducers/commons";
import lastSeason from "./Reducers/lastSeason";
import seasonList from "./Reducers/seasonList";

export default combineReducers({
  playersList,
  club,
  tournament,
  classificationList,
  clubPlayersList,
  auth,
  registration,
  lastSeason,
  blogPostForm,
  clubsList,
  seasonList,
  commons,
  tournamentsList,
  tournamentResultList,
  registrationTournament,
  playerCategories,
  tournamentAddResult,
  router: routerReducer,
  form: formReducer
});
