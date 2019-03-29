import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderChoices, renderField, renderMaskedField} from "../Components/Commons/form";
import {connect} from "react-redux";
import {userRegister} from "../Actions/actions";
import peselFormValidator from "../Components/Commons/peselFormValidator";
import renderDatePicker from "../Components/Commons/renderDatePicker";

const mapDispatchToProps = {
  userRegister
};

class PlayerFormCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressForCorrespondence: false,
      nationality: false
    };
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

  onTermsAcceptedClick(e) {
    this.setState(prevState => ({addressForCorrespondence: !prevState.addressForCorrespondence}));
  }

  onChange(e){
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {handleSubmit} = this.props;
    const nationalityArray = [
        {
          value: 'P',
          label: 'Polska'
        },
        {
          value: 'O',
          label: 'Inna narodowość'
        }
    ];
    const genderArray = [
        {
          value: 'm',
          label: 'Mężczyzna'
        },
        {
          value: 'k',
          label: 'Kobieta'
        }
    ];
    return (
        <div className="card mt-3 mb-6 shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name="firstName" label="Imię:" type="text" component={renderField}  placeholder='Imię'/>
              <Field name="lastName" label="Nazwisko:" type="text" component={renderField} placeholder='Nazwisko'/>
              <Field name='nationality' component={renderChoices} placeholder='Narodowość' label='Narodowość' onChange={this.onChange.bind(this)}>
                <option>Wybierz</option>
                {nationalityArray.map(n=>{
                  return(
                      <option value={n.value} key={n.value}>{n.label}</option>
                  )
                })}
              </Field>
              {this.state.nationality === 'P' && <Field name="pesel" label="PESEL:" type="text" component={peselFormValidator} placeholder='PESEL'/>}
              {this.state.nationality === 'O' &&
                  <div>
                    <Field name="anotherDocument" label="Paszport lub inny dokument torzsamości:" type="text" component={renderField} placeholder='Paszport'/>
                    <Field name="birthAt" label="Data urodzenia:" component={renderDatePicker} block={false}/>
                    <Field name='gender' component={renderChoices} placeholder='Płeć' label='Płeć' >
                      <option>Wybierz</option>
                      {genderArray.map(n=>{
                        return(
                            <option value={n.value} key={n.value}>{n.label}</option>
                        )
                      })}
                    </Field>
                  </div>
              }
              <Field name="placeOfBirth" label="Miejsce urodzenia:" type="text" component={renderField} placeholder='Miejscowość'/>
              <div><h4>Adres Zameldowania</h4></div>
              <Field name="registerAddressStreet" label="Ulica:" type="text" component={renderField} placeholder='Ulica, nr domu, nr mieszkania'/>
              <Field name="registerAddressPostCode" label="kod pocztowy:" type="text" component={renderMaskedField} mask={[/\d/,/\d/,'-',/\d/,/\d/,/\d/]} placeholder='00-000'/>
              <Field name="registerAddressPostOffice" label="Miejscowość:" type="text" component={renderField} placeholder='Miejscowość'/>
              <div className="form-check form-group">
                <input className="form-check-input" type="checkbox"
                       value={false}
                       onClick={this.onTermsAcceptedClick.bind(this)}/>
                <label className="form-check-label">Zaznacz jeśli adres do korespondencji inny niż zameldowania</label>
              </div>
              {this.state.addressForCorrespondence &&
                <div>
                  <div><h4>Adres Korenspondencyjny</h4></div>
                  <Field name="addressForCorrespondenceStreet" label="Ulica:" type="text" component={renderField} placeholder='Ulica, nr domu, nr mieszkania'/>
                  <Field name="addressForCorrespondencePostCode" label="kod pocztowy:" type="text" component={renderMaskedField} mask={[/\d/,/\d/,'-',/\d/,/\d/,/\d/]} placeholder='00-000'/>
                  <Field name="addressForCorrespondencePostOffice" label="Miejscowość:" type="text" component={renderField} placeholder='Miejscowość'/>
                </div>
              }

              <Field name="mail" label="E-mail:" type="text" component={renderField} placeholder='e-mail'/>
              <Field name="phone" label="Telefon:" type="text" component={renderField} placeholder='Telefon'/>
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
  form: 'PlayerFormCreate'
})(connect(null, mapDispatchToProps)(PlayerFormCreate));
