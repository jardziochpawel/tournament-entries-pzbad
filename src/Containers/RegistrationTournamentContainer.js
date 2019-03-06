import React from "react";
import RegisterTournamentForm from "../Forms/RegisterTournamentForm";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  ...state.registration
});

const mapDispatchToProps = {

};

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 10};
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
      return <RegisterTournamentForm/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
