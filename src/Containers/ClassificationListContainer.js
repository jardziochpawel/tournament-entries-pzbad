import React from 'react';
import {classificationListFetch} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import ClassificationList from "../Components/Lists/ClassificationList";

const mapStateToProps = state => ({
  ...state.classificationList
});

const mapDispatchToProps = {
  classificationListFetch: classificationListFetch,
};

class ClubContainer extends React.Component {
  componentDidMount() {
    this.props.classificationListFetch(this.props.match.params.id, this.props.match.params.typeOfGame);
  }

  render() {
    const {isFetching, classification} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
      <div className='w-100'>
      <ClassificationList classification={classification} params={this.props.match.params}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubContainer);
