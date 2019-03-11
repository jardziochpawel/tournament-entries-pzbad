import React from 'react';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";
import FilterResults from 'react-filter-search';
class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        const {players} = this.props;
        this.setState({ data: players })
    }
    componentDidUpdate(prevProps, prevState) {

    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

  render() {
    const {players} = this.props;

    const clubName = (club) => {
      let id = club['@id'].match(/(\d+)/)[1];

      return (
          <Link to={`/club/${id}`}>{club.name}</Link>
      )
    };

    if (null === players || 0 === players.length) {
      return (<Message message="No players yet"/>);
    }
    return (
        <div>
            <div className='form-group'>
                <label htmlFor="search-bar">Wyszukaj:</label>
                <div className="input-group mb-3">
                    <input id='search-bar' className='form-control' placeholder='Wyszukaj' type="text" value={this.state.value} onChange={this.handleChange} aria-label="Username" aria-describedby="basic-addon1"/>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i className='fa fa-search'/></span>
                    </div>
                </div>
            </div>

            <FilterResults
                value={this.state.value}
                data={this.state.data}
                renderResults={results => (<table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">PZBAD ID</th>
                    <th scope="col">Imię</th>
                    <th scope="col">Nazwisko</th>
                    <th scope="col">Klub</th>
                    <th scope="col">Licencja Klubowa</th>
                    <th scope="col">Licencja Drużynowa</th>
                  </tr>
                </thead>
                <tbody>
                    {results.map(player => (
                          <tr key={player.id}>
                            <th scope="row">{player.id}</th>
                            <td>{player.pzbadId}</td>
                            <td>{player.firstName}</td>
                            <td>{player.lastName}</td>
                            <td>{clubName(player.club)}</td>
                            <td>{player.typeClub}</td>
                            <td>{player.typeTeam}</td>
                          </tr>
                    ))}
                </tbody>
            </table>)}
            />
        </div>)
  }
}

export default PlayersList;
