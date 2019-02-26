import React from 'react';
import {clubPlayersListFetch, clubPlayerListSetPage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {ClubPlayersList} from "../Components/Lists/ClubPlayersList";
import {Paginator} from "../Components/Commons/Paginator";

const mapStateToProps = state => ({
  ...state.clubPlayersList
});

const mapDispatchToProps = {
  clubPlayersListFetch: clubPlayersListFetch,
  clubPlayerListSetPage: clubPlayerListSetPage
};

class ClubPlayersListContainer extends React.Component {
  componentDidMount() {
    const {params} = this.props;

    this.props.clubPlayersListFetch(this.getQueryParamPage(params.id), this.getQueryParamPage(params.page));
  }

  componentDidUpdate(prevProps) {
    const {currentPage, clubPlayersListFetch, clubPlayerListSetPage, params} = this.props;

    if (prevProps.params.page !== this.getQueryParamPage(params.page)) {
      clubPlayerListSetPage(this.getQueryParamPage(params.page));
    }

    if (prevProps.currentPage !== currentPage) {
      clubPlayersListFetch(params.id, currentPage);
    }
  }

  getQueryParamPage(param) {
    return Number(param) || 1;
  }


  changePage(page) {
    const {history, clubPlayerListSetPage, params} = this.props;
    clubPlayerListSetPage(page);
    history.push('/club/'+params.id+'/'+page);
  }

  render() {
    const {isFetching, clubPlayersList, pageCount, currentPage} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
      <div>
        <ClubPlayersList clubPlayersList={clubPlayersList}/>
        <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubPlayersListContainer);
