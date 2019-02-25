import React from 'react';
import {Message} from "./Commons/Message";

export class Club extends React.Component {
  render() {
    const {club} = this.props;

    if (null === club) {
      return (<Message message="Club does not exist"/>);
    }
    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <h2>{club.name}</h2>
          <p className="card-text">{club.voivodeship}</p>
        </div>
      </div>
    )
  }
}
