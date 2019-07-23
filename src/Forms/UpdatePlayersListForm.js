import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {
  UpdatePlayersListFormUnload,
  playersListDelete
} from "../Actions/actions";
import UpdatePlayersListUpload from "../Components/UpdatePlayersListUpload";
import {UpdatePlayersListBrowser} from "../Components/UpdatePlayersListBrowser";
import Spinner from "reactstrap/es/Spinner";


const mapStateToProps = state => ({
  ...state.updatePlayersList,

});

const mapDispatchToProps = {
  UpdatePlayersListFormUnload,
  playersListDelete
};

class UpdatePlayersListForm extends React.Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
  }

  componentWillUnmount() {
    this.props.UpdatePlayersListFormUnload();
  }

  onSubmit(values) {
    const {reset, history, images} = this.props;

  }

  render() {
    const {handleSubmit, imageReqInProgress, playersListDelete,  isFetching, images} = this.props;

    if(isFetching){
      return(<Spinner/>)
    }

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

            {images.length === 0 && <UpdatePlayersListUpload label='Lista zawodników:' imageReqInProgress={imageReqInProgress}/>}

            {images.length !== 0 && <div className="alert alert-success" role="alert">
              Sukces plik został przesłany, aktualizacja nastąpi w ciągu kilku minut.
            </div>}
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'UpdatePlayersList'
})(connect(mapStateToProps, mapDispatchToProps)(UpdatePlayersListForm));
