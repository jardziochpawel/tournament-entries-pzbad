import {combineReducers} from "redux";
import blogPostList from "./Reducers/playersList";
import blogPost from "./Reducers/blogPost";
import commentList from "./Reducers/commentList";
import {reducer as formReducer} from 'redux-form';
import auth from "./Reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./Reducers/registration";
import blogPostForm from "./Reducers/blogPostForm";

export default combineReducers({
  blogPostList,
  blogPost,
  commentList,
  auth,
  registration,
  blogPostForm,
  router: routerReducer,
  form: formReducer
});
