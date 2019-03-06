import React from 'react';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";

class TournamentsList extends React.Component {



  render() {
    const {tournaments} = this.props;

    // if (null === tournaments || 0 === tournaments.length) {
    //   return (<Message message="No tournaments yet"/>);
    // }

    return (
      <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Nazwa</th>
              <th scope="col">Organizator</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
              {tournaments && tournaments.map(tournament => {
                return(
                    <tr key={tournament['@id']}>
                        <td>{tournament.id}</td>
                        <td>{tournament.pzbadId}</td>
                        <td>{tournament.name}</td>
                        <td>{tournament.oragnizer.name}</td>
                        <td>.</td>
                    </tr>
                );
              })}
          </tbody>
      </table>)
  }
}

export default TournamentsList;
