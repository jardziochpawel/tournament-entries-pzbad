import React from 'react';
import {Message} from "../Commons/Message";
import moment from "moment";

import "./CommentList.css";

export class ClubPlayersList extends React.Component {
  render() {
    const {clubPlayersList} = this.props;

    if (null === clubPlayersList || 0 === clubPlayersList.length) {
      return (<Message message="No players yet"/>);
    }

    return (
      <div className="card mb-3 mt-3 shadow-sm">
          <table className="table table-striped ">
            <thead>
            <tr>
              <th scope="col">PZBAD ID</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Licencja&nbsp;Klubowa</th>
              <th scope="col">Licencja&nbsp;Drużynowa</th>
              <th scope="col">Licencja&nbsp;ważna&nbsp;do</th>
            </tr>
            </thead>
            <tbody>
            {clubPlayersList && clubPlayersList.map(player => (
                <tr key={player.id}>
                  <td>{player.pzbadId}</td>
                  <td>{player.firstName}</td>
                  <td>{player.lastName}</td>
                  <td>{player.typeClub}</td>
                  <td>{player.typeTeam}</td>
                  <td>{moment(player.expiredAt).format('YYYY-MM-DD')}</td>
                </tr>
            ))}
            </tbody>
          </table>
      </div>
    )
  }
}
