import React from 'react';
import {Route, Switch, Redirect} from "react-router";
import LoginForm from "./Forms/LoginForm";
import PlayersListContainer from "./Containers/PlayersListContainer";
import Header from "./Components/Header";
import ClubContainer from "./Containers/ClubContainer";
import {requests} from "./agent";
import {connect} from "react-redux";
import {userLogout, userProfileFetch, userSetId, getLastSeason, getCurrentSeason} from "./Actions/actions";
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
import UpdatePlayersListContainer from "./Containers/UpdatePlayersListContainer";
import ClubRegistrationContainer from "./Containers/ClubRegistrationContainer";
import currentSeason from "./Reducers/currentSeason";
const mapStateToProps = state => ({
  ...state.auth,
  ...state.lastSeason,
  ...state.currentSeason
});

const mapDispatchToProps = {
  userProfileFetch, userSetId, userLogout, getLastSeason, getCurrentSeason
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('jwtToken');
    const lastSeason = window.localStorage.getItem('lastSeason');
    const currentSeason = window.localStorage.getItem('currentSeason');

    if (token) {
      requests.setToken(token);
    }

    if (lastSeason) {
      requests.setLastSeason(lastSeason);
    }

    if (currentSeason) {
      requests.setCurrentSeason(currentSeason);
    }

  }

  componentDidMount() {
    const userId = window.localStorage.getItem('userId');
    const {userSetId, getLastSeason} = this.props;

    getLastSeason();

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
    const {isAuthenticated, userData, userLogout, lastSeason, currentSeason} = this.props;

    return (
      <div>
        <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} currentSeason={currentSeason}/>
        <div className='w-100' style={{marginTop: 100+'px'}}>
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/blog-post-form" component={BlogPostForm}/>
            <Route path="/clubs/:page?" component={ClubsListContainer}/>
            <Route path="/club/:id/:page?" component={ClubContainer}/>
            <Route path="/register" component={RegistrationContainer}/>
            <Route path="/register-player" component={PlayerFormContainer}/>
            <Route path="/register-club" component={ClubRegistrationContainer}/>
            <Route path="/register-tournament" component={RegistrationTournamentContainer}/>
            <Route path="/add-tournament-result/:id?" component={AddResultTournamentContainer}/>
            <Route path="/edit-tournament/:id?" component={RegistrationTournamentContainer}/>
            <Route path="/players/:page?" component={PlayersListContainer}/>
            <Route path="/update-players-list" component={UpdatePlayersListContainer}/>
            <Route path="/classification/:id/:typeOfGame/:season?" component={ClassificationListContainer}/>
            <Route path="/tournaments/:season?/:page?" component={TournamentsListContainer} lastSeason={lastSeason} currentSeason={currentSeason}/>
            <Route path="/tournaments-calendar/:date?/:season?/:category?" component={TournamentsCalendarContainer} lastSeason={lastSeason} currentSeason={currentSeason}/>
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
