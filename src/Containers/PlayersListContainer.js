import React from 'react';
import PlayersList from "../Components/Lists/PlayersList";
import {playerListFetch, playerListSetPage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";

const mapStateToProps = state => ({
  ...state.playersList
});

const mapDispatchToProps = {
  playerListFetch: playerListFetch,
  playerListSetPage: playerListSetPage
};

class PlayersListContainer extends React.Component {
  componentDidMount() {
    this.props.playerListFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, playerListFetch, playerListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      playerListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      playerListFetch(currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage(page) {
    const {history, playerListSetPage} = this.props;
    playerListSetPage(page);
    history.push(`/players/${page}`);
  }

  render() {
    const {players, isFetching, currentPage, pageCount, history, match, location} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
    return (
      <div>
        <PlayersList players={players} history={history} params={match.params} location={location}/>
        <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListContainer);
