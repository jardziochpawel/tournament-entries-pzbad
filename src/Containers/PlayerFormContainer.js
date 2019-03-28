import React from 'react';
 import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import PlayerFormCreate from "../Forms/PlayerFormCreate";

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

class PlayerFormContainer extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {isFetching, club, history} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }
    if(club){
      return (
          <div>
            <PlayerFormCreate club={club}/>
          </div>
      )
    }

    return (
      <div>
        <PlayerFormCreate club={club}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerFormContainer);
