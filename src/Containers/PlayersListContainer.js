import React from 'react';
import PlayersList from "../Components/Lists/PlayersList";
import {playerListFetch, playerListSetPage, commonPlayerListFetch, commonUnload} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";
import queryString from "query-string";
import moment from "moment";
import {BACKEND_ROOT} from "../agent";

const mapStateToProps = state => ({
  ...state.playersList,
  ...state.commons
});

const mapDispatchToProps = {
  playerListFetch: playerListFetch,
  playerListSetPage: playerListSetPage,
  commonPlayerListFetch: commonPlayerListFetch,
  commonUnload:commonUnload
};

class PlayersListContainer extends React.Component {
  componentDidMount() {
    this.props.commonPlayerListFetch();
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
  componentWillUnmount() {
    this.props.commonUnload();
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
  downloadFile(url){
    setTimeout(() => {
      const response = {
        file: BACKEND_ROOT+url,
      };
      // server sent the url to the file!
      // now, let's download:
      // window.location.href = response.file;
      // you could also do:
      window.open(response.file, "_blank");
    }, 100);
  }
  render() {
    const {players, isFetching, currentPage, pageCount, history, match, location, common} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
    return (
      <div>
        <h1 style={{color: 'red',display: 'block'}}>Ostatnia aktualizacja: {common !== null && moment(common['last_update'].date).format('DD-MM-YYYY')}
          <button type="button" className={"btn btn-primary float-right"}
                  onClick={()=>this.downloadFile(common['url'])}
          >Pobierz pliki</button></h1>
        <PlayersList players={players} history={history} params={match.params} location={location} playerListFetch={this.props.playerListFetch.bind(this)}/>
        <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListContainer);
