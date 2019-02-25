import React from 'react';
import {Route, Switch, Redirect} from "react-router";
import LoginForm from "./Forms/LoginForm";
import PlayersListContainer from "./Containers/PlayersListContainer";
import Header from "./Components/Header";
import ClubContainer from "./Containers/ClubContainer";
import {requests} from "./agent";
import {connect} from "react-redux";
import {userLogout, userProfileFetch, userSetId} from "./Actions/actions";
import RegistrationContainer from "./Containers/RegistrationContainer";
import BlogPostForm from "./Forms/BlogPostForm";

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
  userProfileFetch, userSetId, userLogout
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('jwtToken');

    if (token) {
      requests.setToken(token);
    }
  }

  componentDidMount() {
    const userId = window.localStorage.getItem('userId');
    const {userSetId} = this.props;

    if (userId) {
      userSetId(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const {userId, userData, userProfileFetch} = this.props;

    if (prevProps.userId !== userId && userId !== null && userData === null) {
      userProfileFetch(userId);
    }
  }

  render() {
    const {isAuthenticated, userData, userLogout} = this.props;

    return (
      <div>
        <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout}/>
        <div style={{marginTop: 100+'px'}}>
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/blog-post-form" component={BlogPostForm}/>
            <Route path="/club/:id/:page?" component={ClubContainer}/>
            <Route path="/register" component={RegistrationContainer}/>
            <Route path="/players/:page?" component={PlayersListContainer}/>
            <Redirect from="/" to="/players/:page?"/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
