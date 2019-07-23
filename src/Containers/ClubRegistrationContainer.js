import React from "react";
import {connect} from "react-redux";
import ClubRegisterForm from "../Forms/ClubRegisterForm";

const mapStateToProps = state => ({
  UserData: state.UserData,
  ...state.clubRegistration
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

  render() {
    const {history, isFetching} = this.props;

      return <ClubRegisterForm/>;

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
