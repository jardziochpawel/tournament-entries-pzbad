import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderChoicesField, renderField} from "../Components/Commons/form";
import renderDatePicker from "../Components/Commons/renderDatePicker";
import {connect} from "react-redux";
import {
  blogPostFormUnload,
  imageDelete
} from "../Actions/actions";
import ImageUpload from "../Components/ImageUpload";
import {ImageBrowser} from "../Components/ImageBrowser";
import Spinner from "reactstrap/es/Spinner";


const mapStateToProps = state => ({
  ...state.blogPostForm
});

const mapDispatchToProps = {
  imageDelete,
  blogPostFormUnload
};

class EditTournamentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false
    }
  }
  componentWillUnmount() {
    this.props.blogPostFormUnload();
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
  onSubmit(values) {
    const {reset, history,images} = this.props;
    let pc = [];
    let i = 0;
    const pzbadId = values.pzbadId || null;
    const id = values.id;
    const name = values.name || null;
    const startDate = values.date ? values.date.startDate : null;
    const endDate = values.date ? values.date.endDate : null;
    const place = values.place ? values.place : null;

    if(values.playerCategory){
      values.playerCategory.map(o =>{
        pc[i] = o['@id'];
        i++
      });
    }
    const playersCategories = values.playerCategory ? pc : null;
    const organizer = values.organizer ? values.organizer['@id'] : null;

    const responsiblePersons = values.responsiblePersons || null;
    const systemOfGames = values.systemOfGames || null;
    const entryFee = values.entryFee || null;
    const shuttlecocks = values.shuttlecocks || null;
    const applications = values.applications || null;
    const mainJudge = values.mainJudge || null;
    const alimentation = values.alimentation || null;
    const accommodation = values.accommodation || null;
    const awards = values.awards || null;
    const tournamentAttachment = values.tournamentAttachment? this.getUrlToObject(images) : null;

    return this.props.tournamentUpdate(...Object.values({
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
      tournamentAttachment
    }))
        .then(() => {
          reset();
          history.push('/tournaments');
        });
  }

  render() {
    const {handleSubmit, imageReqInProgress, imageDelete, playerCategories, isFetching, clubs, images} = this.props;

    if(isFetching){
      return(<Spinner/>)
    }

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="pzbadId" label="Nazwa skrócona:" type="text" component={renderField}/>
            <Field name="name" label="Nazwa:" type="text" component={renderField}/>
            <Field name="place" label="Miejsce:" type="text" component={renderField}/>
            <Field name="organizer" className="" component={renderChoicesField} options={clubs? clubs : []}
                   getOptionValue={option => option.id }
                   getOptionLabel={option => option.name}
                   isSearchable={true} isMulti={false} closeMenuOnSelect={true}>
              Organizator:
            </Field>
            <Field
                name='date'
                component={renderDatePicker}
              >
                Data turnieju:
              </Field>
            <Field name="playerCategory" className="" component={renderChoicesField} options={playerCategories? playerCategories : []}
                   getOptionValue={option => option.id}
                   getOptionLabel={option => option.name}
                   isSearchable={false} isMulti={true} closeMenuOnSelect={false}>
              Kategorie:
            </Field>
            <Field name="responsiblePersons" label="Osoba odpowiedzialna za turniej:" type="text" component={renderField}/>
            <Field name="systemOfGames" label="System rozgrywek:" type="text" component={renderField}/>
            <Field name="entryFee" label="Wpisowe:" type="text" component={renderField}/>
            <Field name="shuttlecocks" label="Lotki:" type="text" component={renderField}/>
            <Field name="applications" label="Zgłoszenia do turnieju:" type="text" component={renderField}/>
            <Field name="mainJudge" label="Sędzia główny:" type="text" component={renderField}/>
            <Field name="alimentation" label="Wyżywienie:" type="text" component={renderField}/>
            <Field name="accommodation" label="Zakwaterowanie:" type="text" component={renderField}/>
            <Field name="awards" label="Nagrody:" type="text" component={renderField}/>

            <ImageUpload label='Komunikat organizacyjny:'/>
            <ImageBrowser images={images}
                          deleteHandler={imageDelete}
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
})(connect(mapStateToProps, mapDispatchToProps)(EditTournamentForm));
