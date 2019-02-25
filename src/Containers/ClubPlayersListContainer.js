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
    const {params} = this.props;
    this.props.commentListFetch(Number(params.id), Number(params.page));
  }

  componentDidUpdate(prevProps) {
    const {currentPage, commentListFetch, playerListSetPage, params} = this.props;

    if (prevProps.params.page !== Number(params.page)) {
      playerListSetPage(Number(params.page));
    }

    if (prevProps.currentPage !== currentPage) {
      commentListFetch(currentPage);
    }
  }


  changePage(page) {
    const {history, playerListSetPage, params} = this.props;
    playerListSetPage(page);
    history.push(`/club/${params.id}/${page}`);
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
