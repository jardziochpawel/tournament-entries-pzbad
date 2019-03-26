import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {
  ResultCSVDelete,
  blogPostFormUnload,
  importResultTournament
} from "../Actions/actions";
import ResultsCSVUpload from "../Components/ResultsCSVUpload";
import Spinner from "reactstrap/es/Spinner";
import {ResultCSVBrowser} from "../Components/ResultCSVBrowser";


const mapStateToProps = state => ({
  ...state.tournamentAddResult
});

const mapDispatchToProps = {
  ResultCSVDelete,
  blogPostFormUnload,
  importResultTournament
};

class ResultTournamentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false
    }
  }
  getUrlToObject(array){
    let a = [];
    let i = 0;
    if(array.length > 0 && array !== undefined){
      array.map(o =>{
        a[i] = o['@id'];
        i++
      });
    }
    return a;
  }
  componentWillUnmount() {
    this.props.blogPostFormUnload();
  }

  onSubmit(values) {
    const {reset, history, images, importResultTournament} = this.props;
    const pzbadId = values.pzbadId || '';
    const id = values.id;
    const name = values.name || '';
    const startDate = values.date ? values.date.startDate : '';
    const endDate = values.date ? values.date.endDate : '';
    const place = values.place ? values.place : '';
    const playersCategories = values.playerCategory ? this.getUrlToObject(values.playerCategory) : '';
    const organizer = values.organizer ? values.organizer['@id'] : '';
    const responsiblePersons = values.responsiblePersons || '';
    const systemOfGames = values.systemOfGames || '';
    const entryFee = values.entryFee || '';
    const shuttlecocks = values.shuttlecocks || '';
    const applications = values.applications || '';
    const mainJudge = values.mainJudge || '';
    const alimentation = values.alimentation || '';
    const accommodation = values.accommodation || '';
    const awards = values.awards || '';
    const tournamentPlannerCSV =  images ? this.getUrlToObject(images) : '';


     this.props.tournamentResultUpdate(...Object.values({
      id,
      pzbadId,
      name,
      startDate,
      endDate,
      place,
      playersCategories,
      organizer,
      responsiblePersons,
      systemOfGames,
      entryFee,
      shuttlecocks,
      applications,
      mainJudge,
      alimentation,
      accommodation,
      awards,
      tournamentPlannerCSV
    }))
        .then(() => {
          reset();
        });
    return setTimeout(()=>{
      importResultTournament(id);
      history.goBack();
    },1500);
  }

  render() {
    const {handleSubmit, imageReqInProgress, ResultCSVDelete, isFetching, tournament, images} = this.props;

    if(isFetching){
      return(<Spinner/>)
    }

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            {(images.length === 0 && images !== undefined) && <ResultsCSVUpload label='Wyniki w formacie CSV:' tournamen={tournament && tournament['@id']}/>}
            <ResultCSVBrowser images={images}
                          deleteHandler={ResultCSVDelete}
                          isLocked={imageReqInProgress} />
            <br/>
            <button type="submit" className="btn btn-primary btn-big btn-block">
              Wyślij
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'EditTournament'
})(connect(mapStateToProps, mapDispatchToProps)(ResultTournamentForm));
