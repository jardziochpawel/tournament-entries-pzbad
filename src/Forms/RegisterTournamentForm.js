import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderChoicesField, renderField} from "../Components/Commons/form";
import renderDatePicker from "../Components/Commons/renderDatePicker";
import {connect} from "react-redux";
import {imageDelete, tournamentRegister} from "../Actions/actions";
import ImageUpload from "../Components/ImageUpload";
import {ImageBrowser} from "../Components/ImageBrowser";


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  imageDelete,
  tournamentRegister
};

class RegisterTournamentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false
    }
  }

  componentDidMount() {
  }


  onSubmit(values) {
    console.log(values);
    let i = 0;
    let playerCategory = [];
    const pzbadId = values.pzbadId || null;
    const name = values.name || null;
    const startDate = values.date.startDate || null;
    const endDate = values.date.endDate || null;
    const place = values.place || null;
    values.playersCategories && values.playersCategories.map(pc => {
       playerCategory[i] = {pzbadId: pc.value};
       i++
    });
    const organizer = values.organizer ? values.organizer.value : null;

    console.log({
      pzbadId:pzbadId,
      name:name,
      startDate:startDate,
      endDate:endDate,
      place:place,
      playerCategory:playerCategory,
      organizer:organizer
    });

    return this.props.tournamentRegister(...Object.values({
      pzbadId,
      name,
      startDate,
      endDate,
      place,
      playerCategory,
      organizer
    }))
      .then(() => {
        this.props.reset();
      });
  }

  render() {
    const {handleSubmit, imageReqInProgress, imageDelete} = this.props;
    const images = [];
    const options = [
      { value: 'E', label: 'Elita' },
      { value: 'J', label: 'Junior' },
      { value: 'JM', label: 'Junior Młodszy' },
      { value: 'M', label: 'Młodzik' },
      { value: 'MM', label: 'Młodzik Młodszy' }
    ];

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="pzbadId" label="Nazwa skrócona:" type="text" component={renderField}/>
            <Field name="name" label="Nazwa:" type="text" component={renderField}/>
            <Field name="place" label="Miejsce:" type="text" component={renderField}/>
            <Field name="organizer" className="" component={renderChoicesField} options={options}
                   isSearchable={true} isMulti={false} closeMenuOnSelect={true}>
              Organizator:
            </Field>
            <Field
                name='date'
                component={renderDatePicker}
              >
                Data turnieju:
              </Field>
            <Field name="playersCategories" className="" component={renderChoicesField} options={options}
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
