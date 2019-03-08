import React from 'react';
import {tournamentsResultFetch, tournamentsResultSetPage, tournamentFetch, tournamentsResultSetCategory} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {Paginator} from "../Components/Commons/Paginator";
import TournamentResultList from "../Components/Lists/TournamentResultList";
import moment from "moment";
import classNames from "classnames";

const mapStateToProps = state => ({
  ...state.tournamentResultList,
  ...state.tournament
});

const mapDispatchToProps = {
  tournamentsResultFetch: tournamentsResultFetch,
  tournamentsResultSetPage: tournamentsResultSetPage,
  tournamentsResultSetCategory: tournamentsResultSetCategory,
  tournamentFetch: tournamentFetch
};

class TournamentsResultContainer extends React.Component {
  componentDidMount() {
    this.props.tournamentsResultFetch(this.getQueryParamPage(), 'SM', this.props.match.params.category );
    this.props.tournamentFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, tournamentsResultFetch, tournamentsResultSetPage, currentCategory} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      tournamentsResultSetPage(currentPage);
    }

    if (prevProps.currentPage !== currentPage) {
      tournamentsResultFetch(this.props.match.params.id, currentPage,  this.props.match.params.category);
    }

    if (prevProps.currentCategory !== currentCategory) {
      tournamentsResultFetch(this.props.match.params.id, currentPage,  this.props.match.params.category);
    }


  }

  getQueryParamPage() {
    return Number(this.props.match.params.id) || 1;
  }


  changePage(page) {
    const {tournamentsResultSetPage} = this.props;
    console.log(page);
    tournamentsResultSetPage(page);
  }

  changeCategory(category, id) {
    const {tournamentsResultSetCategory, history} = this.props;
    console.log(category);
    tournamentsResultSetCategory(category);
    history.push('/tournament-result/'+id+'/'+category);
  }

  render() {
    const {results, isFetching, currentPage, tournament} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
    console.log(tournament);
    return (
        <div>
          <div className="card">
              <h4 className="card-header">{tournament && tournament.name}</h4>
              <div className="card-body">
                <h5 className="card-title">Miejscowość:&nbsp;{tournament && tournament.place}</h5>
                <p className="card-text">
                  Data:&nbsp;
                  {tournament && moment(tournament.startDate).format('YYYY-MM-DD')} - {tournament &&  moment(tournament.endDate).format('YYYY-MM-DD')}
                </p>
                <div className="btn-group" role="group" aria-label="Basic example">
                  {tournament && tournament.playerCategory.map(tc => {
                    return(
                        <button type="button" className={this.props.match.params.category === tc.pzbadId ? 'btn btn-secondary active' : "btn btn-secondary" }
                                key={tc['@id']} onClick={()=>this.changeCategory(tc.pzbadId, tournament.id)}>{tc.pzbadId}</button>
                    );
                  })}
                </div>
              </div>

          </div>
          <TournamentResultList results={results} userData={this.props.userData} changePage={this.changePage.bind(this)} currentPage={currentPage}/>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsResultContainer);
