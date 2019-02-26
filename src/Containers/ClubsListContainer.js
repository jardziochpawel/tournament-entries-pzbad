import React from 'react';
import ClubsList from "../Components/Lists/ClubsList";
import {clubListFetch, clubListSetPage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";

const mapStateToProps = state => ({
  ...state.clubsList
});

const mapDispatchToProps = {
  clubListFetch: clubListFetch,
  clubListSetPage: clubListSetPage
};

class ClubsListContainer extends React.Component {
  componentDidMount() {
    this.props.clubListFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, clubListFetch, clubListSetPage} = this.props;
    if (Number(prevProps.match.params.page) !== this.getQueryParamPage()) {
      clubListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      clubListFetch(currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage(page) {
    const {history, clubListSetPage} = this.props;
    clubListSetPage(page);
    history.push(`/clubs/${page}`);
  }

  render() {
    const {history, clubs, isFetching, currentPage, pageCount} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
      <div>
        <ClubsList history={history} clubs={clubs}/>
        <Paginator pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubsListContainer);
