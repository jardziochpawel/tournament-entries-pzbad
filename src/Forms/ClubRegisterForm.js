import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../Components/Commons/form";
import {connect} from "react-redux";
import {clubRegister} from "../Actions/actions";

const mapDispatchToProps = {
  clubRegister
};

class ClubRegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(values) {
    const voivodeship = values.voivodeship;
    const name = values.name;
    const pzbadId = values.pzbadId;
    const object = {pzbadId, name, voivodeship};
    return this.props.clubRegister(...Object.values(object))
      .then(() => {
        this.props.reset();
      });
  }



  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="pzbadId" label="(Numer) ID PZBAD:" type="text" component={renderField}/>
            <Field name="name" label="Nazwa:" type="text" component={renderField}/>
            <Field name="voivodeship" label="Województwo:" type="text" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Zapisz
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'RegisterClubForm'
})(connect(null, mapDispatchToProps)(ClubRegisterForm));
