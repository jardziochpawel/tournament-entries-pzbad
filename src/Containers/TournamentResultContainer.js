import React from 'react';
import {tournamentsResultFetch, tournamentsResultSetPage, tournamentFetch, tournamentsResultSetCategory,tournamentsResultChangePage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import TournamentResultList from "../Components/Lists/TournamentResultList";
import moment from "moment";

const mapStateToProps = state => ({
  ...state.tournamentResultList,
  ...state.tournament
});

const mapDispatchToProps = {
  tournamentsResultFetch: tournamentsResultFetch,
  tournamentsResultSetPage: tournamentsResultSetPage,
  tournamentsResultSetCategory: tournamentsResultSetCategory,
  tournamentFetch: tournamentFetch,
  tournamentsResultChangePage:tournamentsResultChangePage
};

class TournamentsResultContainer extends React.Component {
  componentDidMount() {
    this.props.tournamentsResultFetch(this.getQueryParamPage(), this.props.match.params.typeOfGame, this.props.match.params.category );
    this.props.tournamentFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, tournamentsResultFetch, tournamentsResultSetPage, currentCategory} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      tournamentsResultSetPage(currentPage);
    }

    if (prevProps.currentPage !== currentPage) {
      tournamentsResultFetch(this.props.match.params.id, currentPage,  currentCategory);
    }

    if (prevProps.currentCategory !== currentCategory) {
      tournamentsResultFetch(this.props.match.params.id, currentPage,  currentCategory);
    }


  }

  getQueryParamPage() {
    return Number(this.props.match.params.id) || 1;
  }


  changePage(page) {
    const {tournamentsResultSetPage, history, match,tournamentsResultChangePage} = this.props;
    tournamentsResultChangePage();
    tournamentsResultSetPage(page);
    history.push('/tournament-result/'+match.params.id+'/'+match.params.category+'/'+page);
  }

  changeCategory(id, typeOfGame) {
    const {tournamentsResultSetCategory, history,tournamentsResultChangePage, currentPage} = this.props;
      tournamentsResultChangePage();
      tournamentsResultSetCategory(typeOfGame);
    history.push('/tournament-result/'+id+'/'+typeOfGame+'/'+currentPage);
  }

  render() {
    const {results, isFetching, currentPage, tournament, match} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

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
                    if(this.props.match.params.category === tc.pzbadId ){
                        return(
                            <button type="button" className={"btn btn-secondary active" }
                                    key={tc['@id']} onClick={()=>this.changeCategory(tournament.id, tc.pzbadId)}>{tc.pzbadId}</button>
                        );
                    }
                    return(
                        <button type="button" className={"btn btn-secondary" }
                                key={tc['@id']} onClick={()=>this.changeCategory(tournament.id, tc.pzbadId)}>{tc.pzbadId}</button>
                    );
                  })}
                </div>
              </div>

          </div>
          <TournamentResultList results={results} userData={this.props.userData} changePage={this.changePage.bind(this)} currentPage={currentPage} params={match.params}/>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsResultContainer);
