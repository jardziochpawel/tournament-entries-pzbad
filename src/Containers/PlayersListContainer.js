import React from 'react';
import PlayersList from "../Components/Lists/PlayersList";
import {playerListFetch, playerListSetPage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";
import queryString from "query-string";

const mapStateToProps = state => ({
  ...state.playersList
});

const mapDispatchToProps = {
  playerListFetch: playerListFetch,
  playerListSetPage: playerListSetPage
};

class PlayersListContainer extends React.Component {
  componentDidMount() {
    this.props.playerListFetch(this.getQueryParamPage(), this.QueryFilters());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, playerListFetch, playerListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      playerListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      playerListFetch(currentPage, this.QueryFilters());
    }

    if (prevProps.location.search !== this.props.location.search) {
      playerListFetch(currentPage, this.QueryFilters());
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  QueryFilters(){

    if(this.props.location.search)
    {
      return this.props.location.search;
    }
    return '?';
  }

  changePage(page) {
    const {history, playerListSetPage} = this.props;
    playerListSetPage(page);
    if(this.props.location.search){
      history.push(`/players/${page}`+this.props.location.search);
    }
    else{
      history.push(`/players/${page}`);
    }

  }

  render() {
    const {players, isFetching, currentPage, pageCount, history, match, location} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
    return (
      <div>
        <PlayersList players={players} history={history} params={match.params} location={location} playerListFetch={this.props.playerListFetch.bind(this)}/>
        <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListContainer);
