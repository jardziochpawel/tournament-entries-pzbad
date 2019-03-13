import React from 'react';
import {} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import RegisterTournamentForm from "../Forms/RegisterTournamentForm";

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

class RegistrationContainer extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {isFetching, history} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
      return <RegisterTournamentForm history={history}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
