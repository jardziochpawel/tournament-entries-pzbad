import React from 'react';
import {connect} from "react-redux";
import "./ImageUpload.css";
import {playersListUpload} from "../Actions/actions";
import Spinner from "reactstrap/es/Spinner";

const mapDispatchToProps = {
  playersListUpload
};

class UpdatePlayersListUpload extends React.Component {
  onChange(e) {
    const file = e.target.files[0];
    this.props.playersListUpload(file);
  }

  render() {
    const {label, imageReqInProgress} = this.props;

    if(imageReqInProgress){
      return (<Spinner/>);
    }

    return (
      <div className="form-group nice-input-upload">
        {label !== null && label !== '' && <label>{label}</label>}
        <input type="file"
               onChange={this.onChange.bind(this)}
               className="form-control-file text-primary font-weight-bold"
               data-title="Wybierz lub przesuń i upuść plik"
        />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(UpdatePlayersListUpload);


