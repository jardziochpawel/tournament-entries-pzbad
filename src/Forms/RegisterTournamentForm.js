import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderChoicesField, renderField} from "../Components/Commons/form";
import renderDatePicker from "../Components/Commons/renderDatePicker";
import {connect} from "react-redux";
import {imageDelete} from "../Actions/actions";
import ImageUpload from "../Components/ImageUpload";
import {ImageBrowser} from "../Components/ImageBrowser";


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  imageDelete
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
    // return this.props.userRegister(...Object.values(values))
    //   .then(() => {
    //     this.props.reset();
    //   });
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
