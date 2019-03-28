import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../Components/Commons/form";
import {connect} from "react-redux";
import {userRegister} from "../Actions/actions";

const mapDispatchToProps = {
  userRegister
};

class PlayerFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {termsAccepted: false};
  }

  onSubmit(values) {
    const username = values.username;
    const password = values.password;
    const retypedPassword = values.retypedPassword;
    const email = values.email;
    const name = values.name;
    const object = {username, password, retypedPassword, email, name};

    return this.props.userRegister(...Object.values(object))
      .then(() => {
        this.props.reset();
      });
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="firstName" label="Imię:" type="text" component={renderField}/>
            <Field name="lastName" label="Nazwisko:" type="text" component={renderField}/>
            <Field name="pesel" label="PESEL:" type="text" component={renderField}/>
            <Field name="birthAt" label="Data urodzenia:" type="text" component={renderField}/>
            <Field name="placeOfBirth" label="Miejsce urodzenia:" type="text" component={renderField}/>
            <Field name="registerAddress" label="Adres zameldowania:" type="text" component={renderField}/>
            <Field name="addressForCorrespondence" label="Adres korespondencyjny:" type="text" component={renderField}/>
            <Field name="postCode" label="kod pocztowy:" type="text" component={renderField}/>
            <Field name="postOffice" label="Miejscowość:" type="text" component={renderField}/>
            <Field name="mail" label="E-mail:" type="text" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block">
              Zapisz
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'PlayerFormEdit'
})(connect(null, mapDispatchToProps)(PlayerFormEdit));
