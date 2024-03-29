import React from 'react';
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import RegisterTournamentForm from "../Forms/RegisterTournamentForm";
import {tournamentRegister, playerCategoriesFetch, allClubListFetch, tournamentFetch, tournamentUpdate, getLastSeason, getSeasonList} from "../Actions/actions";
import EditTournamentForm from "../Forms/EditTournamentForm";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";

const mapStateToProps = state => ({
    ...state.tournament,
    userData: state.auth.userData,
    ...state.playerCategories,
    ...state.lastSeason,
    ...state.clubsList,
    ...state.seasonList
});

const mapDispatchToProps = {
    tournamentFetch: tournamentFetch,
    tournamentRegister,
    tournamentUpdate,
    playerCategoriesFetch,
    allClubListFetch,
    getLastSeason,
    getSeasonList
};

class RegistrationContainer extends React.Component {
  componentDidMount() {
    if(this.props.match.params.id){
      this.props.tournamentFetch(this.props.match.params.id);
    }
      this.props.playerCategoriesFetch();
      this.props.getLastSeason();
      this.props.getSeasonList();
      this.props.allClubListFetch();
  }

  componentWillUnmount() {

  }

  render() {
    const {isFetching, history, tournament, playerCategories, clubs, tournamentRegister, tournamentUpdate, lastSeason, seasons} = this.props;

        if (isFetching) {
          return (<Spinner/>);
        }
      console.log(seasons);

    if(tournament === undefined){
      return (<Spinner/>);
    }
      if(!this.props.userData){
          return(<Spinner/>);
      }

      if (!canWriteBlogPost(this.props.userData)) {
          return <Redirect to="/login"/>
      }
      const item = {
            'id': tournament? tournament.id : '',
            'pzbadId': tournament? tournament.pzbadId : '',
            'name': tournament ?tournament.name : '',
            'place': tournament ?tournament.place : '',
            'organizer': tournament ? tournament.organizer : '',
            'date': tournament ? {
                  startDate:tournament.startDate,
                  endDate: tournament.endDate
                } : '',
            'playerCategory':  tournament ? tournament.playerCategory : '',
            'responsiblePersons':  tournament ? tournament.responsiblePersons : '',
            'systemOfGames':  tournament ? tournament.systemOfGames : '',
            'entryFee':  tournament ? tournament.entryFee : '',
            'shuttlecocks':  tournament ? tournament.shuttlecocks : '',
            'applications':  tournament ? tournament.applications : '',
            'mainJudge':  tournament ? tournament.mainJudge : '',
            'alimentation':  tournament ? tournament.alimentation : '',
            'accommodation':  tournament ? tournament.accommodation : '',
            'awards':  tournament ? tournament.awards : '',
            'tournamentAttachment':  tournament ? tournament.tournamentAttachment : '',
            'tournamentPlannerCSV':  tournament ? tournament.tournamentPlannerCSV : '',
            'season':  tournament ? tournament.season : ''
    };
      console.log(item);

      if(tournament && this.props.match.params.id){
        return <EditTournamentForm history={history} match={this.props.match} initialValues={item} playerCategories={playerCategories} clubs={clubs} tournamentUpdate={tournamentUpdate} lastSeason={lastSeason} seasons={seasons}/>;
    }

    return <RegisterTournamentForm history={history} match={this.props.match} playerCategories={playerCategories} clubs={clubs} tournamentRegister={tournamentRegister} lastSeason={lastSeason} seasons={seasons}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
