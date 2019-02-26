import React from 'react';
import {Message} from "../Commons/Message";

import "./CommentList.css";

export class ClubPlayersList extends React.Component {
  render() {
    const {clubPlayersList} = this.props;

    if (null === clubPlayersList || 0 === clubPlayersList.length) {
      return (<Message message="Jeszcze nie ma zawodników"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
          <table className="table table-striped ">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PZBAD ID</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
            </tr>
            </thead>
            <tbody>
            {clubPlayersList && clubPlayersList.map(player => (
                <tr key={player.id}>
                  <th scope="row">{player.id}</th>
                  <td>{player.pzbadId}</td>
                  <td>{player.firstName}</td>
                  <td>{player.lastName}</td>
                </tr>
            ))}
            </tbody>
          </table>
      </div>
    )
  }
}
