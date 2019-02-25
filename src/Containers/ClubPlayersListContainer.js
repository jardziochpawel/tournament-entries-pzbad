import React from 'react';
import {commentListFetch, commentListUnload, playerListSetPage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {ClubPlayersList} from "../Components/Lists/ClubPlayersList";
import {Paginator} from "../Components/Commons/Paginator";

const mapStateToProps = state => ({
  ...state.commentList
});

const mapDispatchToProps = {
  commentListFetch,
  playerListSetPage: playerListSetPage
};

class ClubPlayersListContainer extends React.Component {
  componentDidMount() {
    this.props.commentListFetch(this.getQueryParamPage('id'), this.getQueryParamPage('page'));
  }

  componentDidUpdate(prevProps) {
    const {currentPage, commentListFetch, playerListSetPage} = this.props;

    if (prevProps.params.page !== this.getQueryParamPage('page')) {
      playerListSetPage(this.getQueryParamPage('page'));
    }

    if (prevProps.currentPage !== currentPage) {
      commentListFetch(currentPage);
    }
  }

  getQueryParamPage(p) {
    const {params} = this.props;

    if(p === 'id')
    {
      return Number(params.id);
    }

    return Number(params.page);
  }

  changePage(page) {
    const {history, playerListSetPage} = this.props;
    const id = this.getQueryParamPage('id');
    playerListSetPage(page);
    history.push(`/club/${id}/${page}`);
  }

  render() {
    const {isFetching, commentList, pageCount, currentPage} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
    console.log('pageCount: '+pageCount);
    console.log('currentPage: '+currentPage);
    return (
      <div>
        <ClubPlayersList commentList={commentList}/>
        <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubPlayersListContainer);
