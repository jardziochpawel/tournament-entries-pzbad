import React from 'react';
import {clubFetch, clubUnload} from "../Actions/actions";
import {connect} from "react-redux";
import {Club} from "../Components/Club";
import {Spinner} from "../Components/Commons/Spinner";
import ClubPlayersListContainer from "./ClubPlayersListContainer";

const mapStateToProps = state => ({
  ...state.club
});

const mapDispatchToProps = {
  clubFetch: clubFetch,
  clubUnload: clubUnload
};

class ClubContainer extends React.Component {
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

    return (
      <div>
      <Club club={club}/>
        {club && <ClubPlayersListContainer params={this.props.match.params} history={history} pageCount={club.players.length}/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubContainer);
