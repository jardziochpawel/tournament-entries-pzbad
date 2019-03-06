import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderChoicesField, renderField} from "../Components/Commons/form";
import renderDatePicker from "../Components/Commons/renderDatePicker";
import {connect} from "react-redux";
import {clubListFetch, clubListSetPage} from "../Actions/actions";
import {Spinner} from "../Components/Commons/Spinner";
import moment from 'moment'

const mapStateToProps = state => ({
  ...state.clubsList
});

const mapDispatchToProps = {
  clubListFetch: clubListFetch,
  clubListSetPage: clubListSetPage
};

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false
    }
  }

  componentDidMount() {
    // this.props.clubListFetch();
  }


  onSubmit(values) {
    console.log(values);
    // return this.props.userRegister(...Object.values(values))
    //   .then(() => {
    //     this.props.reset();
    //   });
  }

  render() {
    const {handleSubmit, clubs, isFetching, currentPage, pageCount} = this.props;

    const options = [
      { value: 'E', label: 'Elita' },
      { value: 'J', label: 'Junior' },
      { value: 'JM', label: 'Junior Młodszy' },
      { value: 'M', label: 'Młodzik' },
      { value: 'MM', label: 'Młodzik Młodszy' },
      { value: 'Ż', label: 'Żak' },
      { value: 'ŻM', label: 'Żak Młodszy' },
    ];

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="pzbadId" label="ID:" type="text" component={renderField}/>
            <Field name="name" label="Nazwa:" type="text" component={renderField}/>
            <Field name="place" label="Miasto:" type="text" component={renderField}/>
            <Field name="organizer" className="" component={renderChoicesField} options={options}
                   isSearchable={true} isMulti={false} closeMenuOnSelect={true}>
              Organizator:
            </Field>
            <Field
                name="expirationDate"
                inputValueFormat="YYYY-MM-DD"
                dateFormat="YYYY-MM-dd"
                dateFormatCalendar="dddd"
                fixedHeight
                showMonthDropdown
                placeholder='Wybierz datę'
                showYearDropdown
                dropdownMode="select"
                normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
                component={renderDatePicker}
            >
              Data turnieju:
            </Field>
            <Field name="playersCategories" className="" component={renderChoicesField} options={options}
                   isSearchable={false} isMulti={true} closeMenuOnSelect={false}>
              Kategorie:
            </Field>
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
})(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
