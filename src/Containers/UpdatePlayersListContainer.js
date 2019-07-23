import React from 'react';
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import UpdatePlayersListForm from "../Forms/UpdatePlayersListForm";

const mapStateToProps = state => ({

    userData: state.auth.userData,

});

const mapDispatchToProps = {

};

class UpdatePlayersListContainer extends React.Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { userData } = this.props;

      if (!canWriteBlogPost(userData)) {
          return <Redirect to="/login"/>
      }

      return (
          <UpdatePlayersListForm/>
      )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlayersListContainer);
