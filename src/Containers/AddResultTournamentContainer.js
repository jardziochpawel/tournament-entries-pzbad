import React from 'react';
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {tournamentRegister, playerCategoriesFetch, allClubListFetch, tournamentFetch, tournamentResultUpdate} from "../Actions/actions";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import ResultTournamentForm from "../Forms/ResultTournamentForm";

const mapStateToProps = state => ({
    ...state.tournament,
    userData: state.auth.userData,
    ...state.playerCategories,
    ...state.clubsList
});

const mapDispatchToProps = {
    tournamentFetch: tournamentFetch,
    tournamentRegister,
    tournamentResultUpdate,
    playerCategoriesFetch,
    allClubListFetch,
};

class RegistrationContainer extends React.Component {
  componentDidMount() {
    if(this.props.match.params.id){
      this.props.tournamentFetch(this.props.match.params.id);
    }
      this.props.playerCategoriesFetch();
      this.props.allClubListFetch();
  }

  render() {
    const {isFetching, history, tournament, tournamentResultUpdate} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

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
        'tournamentPlannerCSV':  tournament ? tournament.tournamentPlannerCSV : ''
    };

    if(tournament)
    {
        return <ResultTournamentForm history={history} match={this.props.match} initialValues={item} tournamentResultUpdate={tournamentResultUpdate} tournament={tournament}/>;
    }
    return <ResultTournamentForm history={history} match={this.props.match} initialValues={item} tournamentResultUpdate={tournamentResultUpdate} tournament={tournament}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
