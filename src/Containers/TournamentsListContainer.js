import React from 'react';
import {tournamentsListFetch, tournamentsListSetPage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";
import TournamentsList from "../Components/Lists/TournamentsList";

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.tournamentsList
});

const mapDispatchToProps = {
  tournamentsListFetch: tournamentsListFetch,
  tournamentsListSetPage: tournamentsListSetPage
};

class TournamentsListContainer extends React.Component {
  componentDidMount() {
    this.props.tournamentsListFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, tournamentsListFetch, tournamentsListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      tournamentsListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      tournamentsListFetch(currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage(page) {
    const {history, tournamentsListSetPage} = this.props;
    tournamentsListSetPage(page);
    history.push(`/tournaments/${page}`);
  }

  render() {
    const {tournaments, isFetching, currentPage, pageCount} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
        <div>
          <TournamentsList tournaments={tournaments} userData={this.props.userData}/>
          <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsListContainer);
