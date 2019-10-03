import React from 'react';
import {tournamentsListFetch, tournamentsListSetPage, tournamentsListSetSeason, getSeasonList, getCurrentSeason} from "../Actions/actions";
import {connect} from "react-redux";
import {Paginator} from "../Components/Commons/Paginator";
import TournamentsList from "../Components/Lists/TournamentsList";
import {Switch} from "../Components/Commons/Switch";
import {Spinner} from "../Components/Commons/Spinner";

const mapStateToProps = state => ({
  userData: state.auth.userData,
  lastSeason: state.lastSeason,
  currentSeason: state.currentSeason.currentSeason,
  ...state.tournamentsList,
  ...state.seasonList,

});

const mapDispatchToProps = {
  tournamentsListFetch: tournamentsListFetch,
  tournamentsListSetPage: tournamentsListSetPage,
  tournamentsListSetSeason: tournamentsListSetSeason,
  getSeasonList: getSeasonList,
  getCurrentSeason
};

class TournamentsListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.tournamentsListFetch(this.getQueryParamPage(), this.getQueryParamSeason());
    this.props.getSeasonList();

  }

  componentDidUpdate(prevProps) {
    const {currentPage, tournamentsListFetch, tournamentsListSetSeason, thisSeason, tournamentsListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      tournamentsListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      tournamentsListFetch(currentPage, thisSeason);
    }

    if (prevProps.match.params.season !== this.getQueryParamSeason()) {
      tournamentsListSetSeason(this.getQueryParamSeason());
    }

    if (prevProps.thisSeason !== thisSeason) {
      tournamentsListFetch(currentPage, thisSeason);
    }
  }

  checkCurrentSeason(){
    if(this.props.currentSeason){
     return this.props.currentSeason;
    }
    else{
      setTimeout(() => this.checkCurrentSeason(),500);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  getQueryParamSeason() {
    return Number(this.props.match.params.season) || this.checkCurrentSeason();
  }

  changePage(page) {
    const {history, thisSeason} = this.props;
    history.push(`/tournaments/${thisSeason}/${page}`);
  }

  changeSeason(season) {
    const {history} = this.props;
    history.push(`/tournaments/${season}/1`);
  }

  render() {
    const {tournaments, isFetching, currentPage, pageCount, thisSeason, history} = this.props;

    if(!this.props.match.params.season){
      if(!thisSeason)
      {
        return (<Spinner/>)
      }
      else{
        history.push('/tournaments/'+thisSeason+'/1');
      }
    }

    return (
        <div>
          <Switch changeSeason={this.changeSeason.bind(this)} seasons={this.props.seasons} thisSeason={thisSeason}/>
          <TournamentsList tournaments={tournaments} userData={this.props.userData} isFetching={isFetching}/>
          <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)} />
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsListContainer);
