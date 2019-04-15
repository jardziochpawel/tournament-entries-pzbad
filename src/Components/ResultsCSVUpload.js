import React from 'react';
import {connect} from "react-redux";
import "./ImageUpload.css";
import {tournamentPlannerFiles} from "../Actions/actions";

const mapDispatchToProps = {
  tournamentPlannerFiles
};

class ResultsCSVUpload extends React.Component {
  onChange(e) {
    const {tournament} = this.props;
    const file = e.target.files[0];
    this.props.tournamentPlannerFiles(file, tournament);
  }

  render() {
    const {label} = this.props;
    return (
      <div className="form-group nice-input-upload">
        {label !== null && label !== '' && <label>{label}</label>}
        <input type="file"
               onChange={this.onChange.bind(this)}
               className="form-control-file text-primary font-weight-bold"
               data-title="Click me or drag and drop file"
        />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ResultsCSVUpload);


