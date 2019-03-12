import React from 'react';
import {Link} from "react-router-dom";
import {Message} from "../Commons/Message";
import queryString from 'query-string'
import moment from "moment";

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
            id: '',
            pzbadId: '',
            firstName: '',
            lastName: '',
            club: '',
            typeClub: '',
            typeTeam: '',
            expiredAt: '',
        };
        this.onEnterClick = this.onEnterClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        const values = queryString.parse(this.props.location.search);
        let id = values.id || '';
        let pzbadId = values.pzbadId || '';
        let firstName = values.firstName || '';
        let lastName = values.lastName || '';
        let club = values.club || '';
        let typeClub = values.typeClub || '';
        let typeTeam = values.typeTeam || '';
        let expiredAt = values.expiredAt || '';
        this.setState({ id: id});
        this.setState({ pzbadId:  pzbadId });
        this.setState({ firstName:  firstName });
        this.setState({ lastName:  lastName });
        this.setState({ club:  club });
        this.setState({ typeClub:  typeClub });
        this.setState({ typeTeam:  typeTeam });
        this.setState({ expiredAt:  expiredAt });

    }
    componentDidUpdate(prevProps, prevState) {

    }

    getQueryParamPage() {
        const { params} = this.props;

        return Number(params.page) || 1;
    }

    handleChange(event)  {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    onEnterClick(event){
        const {history, location, params} = this.props;
        let values = queryString.parse(this.props.location.search);

        if(location.search){
            if(event.key === 'Enter'){
                values[event.target.name] = event.target.value;
                history.push({
                    search: queryString.stringify(values)
                } );
            }
        }else{
            if(event.key === 'Enter'){
                values[event.target.name] = event.target.value;
                history.push(
                   '/players/'+(Number(params.page)||1)+'?'+queryString.stringify(values)
                );
            }
        }


    }

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
            <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">ID
                        <input type='text' className='form-control' name='pzbadId' value={this.state.pzbadId} onChange={this.handleChange} onKeyPress={this.onEnterClick} />
                    </th>
                    <th scope="col">Imię
                        <input type='text' className='form-control' name='firstName' value={this.state.firstName} onChange={this.handleChange} onKeyPress={this.onEnterClick} />
                    </th>
                    <th scope="col">Nazwisko
                        <input type='text' className='form-control' name='lastName' value={this.state.lastName} onChange={this.handleChange} onKeyPress={this.onEnterClick} />
                    </th>
                    <th scope="col">Klub
                        <input type='text' className='form-control' name='club' value={this.state.club} onChange={this.handleChange} onKeyPress={this.onEnterClick} />
                    </th>
                    <th scope="col">Licencja&nbsp;Klubowa
                        <input type='text' className='form-control' name='typeClub' value={this.state.typeClub} onChange={this.handleChange} onKeyPress={this.onEnterClick} /></th>
                    <th scope="col">Licencja&nbsp;Drużynowa
                        <input type='text' className='form-control' name='typeTeam' value={this.state.typeTeam} onChange={this.handleChange} onKeyPress={this.onEnterClick} /></th>
                    <th scope="col">Licencja&nbsp;ważna&nbsp;do
                        <input type='text' className='form-control' name='expiredAt' value={this.state.expiredAt} onChange={this.handleChange} onKeyPress={this.onEnterClick} /></th>
                  </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                          <tr key={player.id}>
                            <td>{player.pzbadId}</td>
                            <td>{player.firstName}</td>
                            <td>{player.lastName}</td>
                            <td>{clubName(player.club)}</td>
                            <td>{player.typeClub}</td>
                            <td>{player.typeTeam}</td>
                            <td>{moment(player.expiredAt).format('YYYY-MM-DD')}</td>
                          </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    }
}

export default PlayersList;
