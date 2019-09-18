import React from 'react';
import {tournamentsListFetch, tournamentsListSetPage, tournamentsListSetSeason, getSeasonList} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";
import TournamentsList from "../Components/Lists/TournamentsList";
import {Switch} from "../Components/Commons/Switch";

const mapStateToProps = state => ({
  userData: state.auth.userData,
  lastSeason: state.lastSeason,
  ...state.tournamentsList,
  ...state.seasonList,

});

const mapDispatchToProps = {
  tournamentsListFetch: tournamentsListFetch,
  tournamentsListSetPage: tournamentsListSetPage,
  tournamentsListSetSeason: tournamentsListSetSeason,
  getSeasonList: getSeasonList

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
    const {currentPage, tournamentsListFetch, tournamentsListSetSeason, currentSeason, tournamentsListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      tournamentsListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      tournamentsListFetch(currentPage, currentSeason);
    }

    if (prevProps.match.params.season !== this.getQueryParamSeason()) {
      tournamentsListSetSeason(this.getQueryParamSeason());
    }

    if (prevProps.currentSeason !== currentSeason) {
      tournamentsListFetch(currentPage, currentSeason);
    }
  }

  checkLastSeason(){
    if(this.props.lastSeason){
     return this.props.lastSeason.last_season;
    }
    else{
      setTimeout(() => this.checkLastSeason(),500);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  getQueryParamSeason() {
    return Number(this.props.match.params.season) || this.checkLastSeason();
  }

  changePage(page) {
    const {history, currentSeason} = this.props;
    history.push(`/tournaments/${currentSeason}/${page}`);
  }

  changeSeason(season) {
    const {history} = this.props;
    history.push(`/tournaments/${season}/1`);
  }

  render() {
    const {tournaments, isFetching, currentPage, pageCount, currentSeason} = this.props;


    return (
        <div>
          <Switch changeSeason={this.changeSeason.bind(this)} seasons={this.props.seasons} currentSeason={currentSeason}/>
          <TournamentsList tournaments={tournaments} userData={this.props.userData} isFetching={isFetching}/>
          <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)} />
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsListContainer);
