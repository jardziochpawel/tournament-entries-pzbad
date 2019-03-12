import React from 'react';
import {clubFetch, clubUnload} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import RegisterTournamentForm from "../Forms/RegisterTournamentForm";

const mapStateToProps = state => ({
  ...state.club
});

const mapDispatchToProps = {
  clubFetch: clubFetch,
  clubUnload: clubUnload
};

class RegistrationContainer extends React.Component {
  componentDidMount() {
    this.props.clubFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clubUnload();
  }

  render() {
    const {isFetching, club, history} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
      return <RegisterTournamentForm club={club} history={history}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
