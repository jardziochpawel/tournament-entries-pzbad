import React from 'react';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";

class PlayersList extends React.Component {



  render() {
    const {players} = this.props;

    const clubName = (club) => {
      let id = club['@id'].match(/(\d+)/)[1];

      return (
          <Link to={`/club/${id}`}>{club.name}</Link>
      )
    };

    if (null === players || 0 === players.length) {
      return (<Message message="No blog posts"/>);
    }
    return (
      <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PZBAD ID</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Klub</th>
            </tr>
          </thead>
          <tbody>
              {players && players.map(player => (
                    <tr key={player.id}>
                      <th scope="row">{player.id}</th>
                      <td>{player.pzbadId}</td>
                      <td>{player.firstName}</td>
                      <td>{player.lastName}</td>
                      <td>{clubName(player.club)}</td>
                    </tr>
              ))}
          </tbody>
      </table>)
  }
}

export default PlayersList;
