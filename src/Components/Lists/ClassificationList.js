import React from 'react';
import {Message} from "../Commons/Message";
import moment from "moment";
import {Link} from "react-router-dom";

class ClassificationList extends React.Component {



  render() {
    const {classification, params} = this.props;
    let i = 0;

    if (null === classification || 0 === classification.length) {
      return (<Message message="No clubs"/>);
    }

    return (
        <div className="">
          <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Imię</th>
                  <th scope="col">Nazwisko</th>
                  <th scope="col">Club</th>
                  <th scope="col">Rok urodzenia</th>
                  <th scope="col">Województwo</th>
                  <th scope="col">Suma pkt</th>
                  <th scope="col">Wyniki</th>
                </tr>
              </thead>
              <tbody>
                  {classification && classification.map(c => {
                      i++;
                    return(
                        <tr key={c.player.pzbadId}>
                            <td>{c.position}</td>
                            <td>{c.player.pzbadId}</td>
                            <td>{c.player.firstName}</td>
                            <td>{c.player.lastName}</td>
                            <td>{c.player.name}</td>
                            <td>{moment(c.player.birthAt).format('YYYY')}</td>
                            <td>{c.player.voivodeship}</td>
                            <td>{c.sum_of_points}</td>
                            <td>{c.best_results.map(b=>{
                                return(
                                    <span>
                                        <Link to={'/tournament-result/'+b.tournament.id+'/'} key={b.tournament.id}>
                                            {b.tournament.id}/{b.points}
                                        </Link>
                                        &nbsp;&nbsp;
                                    </span>
                                );
                            })}</td>
                        </tr>
                    );
                  })}
              </tbody>
          </table>
        </div>)
  }
}

export default ClassificationList;
