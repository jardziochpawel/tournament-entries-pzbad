import React from 'react';
import {Message} from "../Commons/Message";

class ClubsList extends React.Component {



  render() {
    const {clubs, history} = this.props;

    const clubId = (club) => {
      return club['@id'].match(/(\d+)/)[1];
    };

    if (null === clubs || 0 === clubs.length) {
      return (<Message message="No clubs"/>);
    }

    return (
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nazwa</th>
              <th scope="col">Województwo</th>
            </tr>
          </thead>
          <tbody>
              {clubs && clubs.map(club => {
                  const onClick = (id) => {
                    history.push('/club/'+id);
                  };
                  return(
                      <tr key={club['@id']} onClick={() => onClick(clubId(club))} style={{cursor: 'pointer'}}>
                          <th scope="row">{clubId(club)}</th>
                          <td>{club.name}</td>
                          <td>{club.voivodeship}</td>
                      </tr>
                  )
              })}
          </tbody>
      </table>)
  }
}

export default ClubsList;
