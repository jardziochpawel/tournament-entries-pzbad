import React from 'react';
import {tournamentsResultFetch, tournamentsResultSetPage, tournamentFetch, tournamentsResultSetCategory,tournamentsResultChangePage} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import TournamentResultList from "../Components/Lists/TournamentResultList";
import moment from "moment";
import Download from '@axetroy/react-download';
import {BACKEND_ROOT} from "../agent";
import {canAddTournamentResult} from "../apiUtils";
import {Redirect} from "react-router";

const mapStateToProps = state => ({
  ...state.tournamentResultList,
  userData: state.auth.userData,
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
    this.props.tournamentsResultSetPage(this.props.match.params.typeOfGame);
    this.props.tournamentsResultSetCategory(this.props.match.params.category);
    this.props.tournamentsResultFetch(this.getQueryParamPage(), this.props.match.params.typeOfGame, this.props.match.params.category );
    this.props.tournamentFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, tournamentsResultFetch, currentCategory} = this.props;

    if (prevProps.currentPage !== currentPage) {

      tournamentsResultFetch(this.getQueryParamPage(), currentPage,   currentCategory);
    }

    if (prevProps.currentCategory !== currentCategory) {

      tournamentsResultFetch(this.getQueryParamPage(), currentPage, currentCategory );
    }


  }

  getQueryParamPage() {
    return Number(this.props.match.params.id) || 1;
  }


  changePage(typeOfGame) {
    const {tournamentsResultSetPage, history, match,tournamentsResultChangePage} = this.props;
    tournamentsResultChangePage();
    tournamentsResultSetPage(typeOfGame);
    history.push('/tournament-result/'+match.params.id+'/'+match.params.category+'/'+typeOfGame);
  }

  changeCategory(id, category) {
    const {tournamentsResultSetCategory, history,tournamentsResultChangePage, match} = this.props;
      tournamentsResultChangePage();
      tournamentsResultSetCategory(category);
    history.push('/tournament-result/'+id+'/'+ category +'/'+ match.params.typeOfGame);
  }
  download(url) {
    // fake server request, getting the file url as response
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
  trimByWord(sentence) {
    let result = sentence;
    let resultArray = result.split(" ");
    if(resultArray.length > 5){
      resultArray = resultArray.slice(0,100);
      resultArray[4] = resultArray[4]+'\n';
      console.log(resultArray);
      result = resultArray.join(" ") ;

      console.log(result);

    }
    return result;
  }
  render() {
    const {results, isFetching, currentPage, tournament, match, history} = this.props;
    const style = {headerText:{
        float: 'left',
        color: '#fff',
        padding: '4px 20px'
      }};
    if (isFetching) {
      return (<Spinner/>);
    }

    return (
        <div>
          <div className="card">
              <h2 className="card-header" style={{display: 'inline'}}>{tournament && tournament.name}</h2>
              <div className="card-body">
                <h4 className="card-title">Miejsce:&nbsp;{tournament && tournament.place}</h4>
                {tournament && <h5 className="card-title">Data:&nbsp;
                {tournament && moment(tournament.startDate).format('YYYY-MM-DD')} - {tournament &&  moment(tournament.endDate).format('YYYY-MM-DD')}</h5>}
                <div className="row">
                  <div className='col-6'>
                    <p className="card-text">
                      Organizator:&nbsp;{tournament && tournament.organizer.name}
                    </p>
                    <p className="card-text">
                      Główny sędzia:&nbsp;{tournament && tournament.mainJudge}
                    </p>
                    <p className="card-text">
                      Zgłoszenia:&nbsp;{tournament && tournament.applications}
                    </p>
                    <p className="card-text">
                      Wpisowe:&nbsp;{tournament && tournament.entryFee}
                    </p>
                    <p className="card-text">
                      System rozgrywek:&nbsp;{tournament && tournament.systemOfGames}
                    </p>
                    <p className="card-text">
                      Lotki:&nbsp;{tournament && tournament.shuttlecocks}
                    </p>
                    <p className="card-text">
                      Zakwaterowanie:&nbsp;{tournament && tournament.accommodation}
                    </p>
                    <p className="card-text">
                      Wyżywienie:&nbsp;{tournament && tournament.alimentation}
                    </p>
                    <p className="card-text">
                      Nagrody:&nbsp;{tournament && tournament.awards}
                    </p>
                  </div>
                    <div className='col-6'>
                      <h5>Komunikaty:</h5>
                      {tournament && tournament.tournamentAttachment.map(a=>{
                        return(
                            <button className='btn btn-link' key={a.id} onClick={()=>this.download(a.url)}>{a.name}</button>
                        )
                      })}
                    </div>
                  </div>
                <h4 style={{paddingTop: 50+'px',}}>Kategorie:</h4>
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
                {canAddTournamentResult(this.props.userData) &&
                <button className='btn btn-primary' style={{float: 'right'}} onClick={()=>history.push('/add-tournament-result/'+tournament.id)}><i className='fa fa-plus'/>&nbsp;Dodaj wyniki</button>
                }
              </div>

          </div>
          <TournamentResultList results={results} userData={this.props.userData} changePage={this.changePage.bind(this)} currentPage={currentPage} params={match.params}/>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsResultContainer);
