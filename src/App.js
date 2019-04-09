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
import RegistrationTournamentContainer from "./Containers/RegistrationTournamentContainer";
import BlogPostForm from "./Forms/BlogPostForm";
import ClubsListContainer from "./Containers/ClubsListContainer";
import TournamentsListContainer from "./Containers/TournamentsListContainer";
import TournamentResultContainer from "./Containers/TournamentResultContainer";
import TournamentResultForm from "./Forms/TournamentResultForm";
import ClassificationListContainer from "./Containers/ClassificationListContainer";
import 'react-dates/initialize';
import TournamentsCalendarContainer from "./Containers/TournamentsCalendarContainer";
import AddResultTournamentContainer from "./Containers/AddResultTournamentContainer";
import PlayerFormContainer from "./Containers/PlayerFormContainer";

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
        <div className='w-100' style={{marginTop: 100+'px'}}>
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/blog-post-form" component={BlogPostForm}/>
            <Route path="/clubs/:page?" component={ClubsListContainer}/>
            <Route path="/club/:id/:page?" component={ClubContainer}/>
            <Route path="/register" component={RegistrationContainer}/>
            <Route path="/register-player" component={PlayerFormContainer}/>
            <Route path="/register-tournament" component={RegistrationTournamentContainer}/>
            <Route path="/add-tournament-result/:id?" component={AddResultTournamentContainer}/>
            <Route path="/edit-tournament/:id?" component={RegistrationTournamentContainer}/>
            <Route path="/players/:page?" component={PlayersListContainer}/>
            <Route path="/classification/:id/:typeOfGame" component={ClassificationListContainer}/>
            <Route path="/tournaments/:page?" component={TournamentsListContainer}/>
            <Route path="/tournaments-calendar/:date?/:category?" component={TournamentsCalendarContainer}/>
            <Route path="/tournament-result/:id/:category/:typeOfGame?" component={TournamentResultContainer}/>
            <Route path="/tournament-result-form/:id" component={TournamentResultForm}/>
            <Redirect from="/" to="/players/:page?"/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
