import React from 'react';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";
import moment from "moment";
import {canWriteBlogPost} from "../../apiUtils";

class TournamentsList extends React.Component {



  render() {
    const {tournaments, userData} = this.props;

    if (null === tournaments || 0 === tournaments.length) {
      return (<Message message="No tournaments yet"/>);
    }
    let i = 1;
    return (
      <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Nazwa</th>
              <th scope="col">Organizator</th>
              <th scope="col">Miejsce zawodów</th>
              <th scope="col">Data rozpoczęcia</th>
              <th scope="col">Data zakończenia</th>
                <th scope="col">Wyniki</th>
                {
                    canWriteBlogPost(userData) &&
                    <th scope="col">Akcje</th>
                }
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
                        <td>{tournament.place}</td>
                        <td>{moment(tournament.startDate).format('YYYY-MM-DD')}</td>
                        <td>{moment(tournament.endDate).format('YYYY-MM-DD')}</td>
                        <td>

                            <ul className="list-inline">
                                {tournament.playerCategory.map(
                                    category => {
                                        if(i === tournament.playerCategory.length){
                                            i = 1;
                                            return(
                                                <Link to={'/tournament-result/'+tournament.id+'/'+category.pzbadId} key={category['@id']}>
                                                    <li className="list-inline-item">
                                                    {category.pzbadId}
                                                </li></Link>

                                            );
                                        }
                                        i++;
                                        return(
                                            <Link to={'/tournament-result/'+tournament.id+'/'+category.pzbadId} key={category['@id']}>
                                                <li className="list-inline-item">
                                                    {category.pzbadId},&nbsp;
                                                </li>
                                            </Link>
                                        );
                                    }
                                )}
                            </ul></td>
                        {
                            canWriteBlogPost(userData) &&
                            <td>
                                <Link to={'/tournament-result-form/'+tournament.id}>
                                            <i className='fa fa-pencil'/>
                                </Link>
                            </td>
                        }
                    </tr>
                );
              })}
          </tbody>
      </table>)
  }
}

export default TournamentsList;
