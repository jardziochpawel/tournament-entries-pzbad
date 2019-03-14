import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderChoicesField, renderField} from "../Components/Commons/form";
import renderDatePicker from "../Components/Commons/renderDatePicker";
import {connect} from "react-redux";
import {imageDelete, tournamentRegister, playerCategoriesFetch, allClubListFetch} from "../Actions/actions";
import ImageUpload from "../Components/ImageUpload";
import {ImageBrowser} from "../Components/ImageBrowser";
import Spinner from "reactstrap/es/Spinner";


const mapStateToProps = state => ({
  ...state.playerCategories,
  ...state.clubsList
});

const mapDispatchToProps = {
  imageDelete,
  tournamentRegister,
  playerCategoriesFetch,
  allClubListFetch
};

class RegisterTournamentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false
    }
  }

  componentDidMount() {
    this.props.playerCategoriesFetch();
    this.props.allClubListFetch();
  }


  onSubmit(values) {
    console.log(values);
    let i = 0;
    const pzbadId = values.pzbadId || null;
    const name = values.name || null;
    const startDate = values.date ? values.date.startDate : null;
    const endDate = values.date ? values.date.endDate : null;
    const place = values.place || null;
    const playersCategories = values.playersCategories ? values.playersCategories : null;
    const organizer = values.organizer ? values.organizer : null;

    console.log({
      pzbadId:pzbadId,
      name:name,
      startDate:startDate,
      endDate:endDate,
      place:place,
      playersCategories:playersCategories,
      organizer:organizer
    });

    return this.props.tournamentRegister(...Object.values({
      pzbadId,
      name,
      startDate,
      endDate,
      place,
      playersCategories,
      organizer
    }))
      .then(() => {
        this.props.reset();
      });
  }

  render() {
    const {handleSubmit, imageReqInProgress, imageDelete, playerCategories, isFetching, clubs} = this.props;
    const images = [];
    const options = [
      { value: 'E', label: 'Elita'},
      { value: 'J', label: 'Junior'},
      { value: 'JM', label: 'Junior Młodszy'},
      { value: 'M', label: 'Młodzik'},
      { value: 'MM', label: 'Młodzik Młodszy'}
    ];

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
            <Field name="organizer" className="" component={renderChoicesField} options={clubs? clubs : options}
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
            <Field name="playersCategories" className="" component={renderChoicesField} options={playerCategories? playerCategories : options}
                   getOptionValue={option => option.id}
                   getOptionLabel={option => option.name}
                   isSearchable={false} isMulti={true} closeMenuOnSelect={false}>
              Kategorie:
            </Field>

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
  form: 'RegisterForm'
})(connect(mapStateToProps, mapDispatchToProps)(RegisterTournamentForm));
