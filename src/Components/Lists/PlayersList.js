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
            'club.name': '',
            typeClub: '',
            typeTeam: '',
            'expiredAt[after]': '',
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
        let club = values['club.name'] || '';
        let typeClub = values.typeClub || '';
        let typeTeam = values.typeTeam || '';
        let expiredAt = values['expiredAt[after]'] || '';
        this.setState({ id: id});
        this.setState({ pzbadId:  pzbadId });
        this.setState({ firstName:  firstName });
        this.setState({ lastName:  lastName });
        this.setState({ 'club.name':  club });
        this.setState({ typeClub:  typeClub });
        this.setState({ typeTeam:  typeTeam });
        this.setState({ 'expiredAt[after]':  expiredAt });

    }
    componentDidUpdate(prevProps, prevState) {

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
                let searchValues = queryString.stringify(values);

                if(event.target.value === '')
                {
                    searchValues = searchValues.replace(encodeURI(event.target.name)+'=', '');
                }

                history.push({
                    search: searchValues
                } );
            }
        }else{
            if(event.key === 'Enter'){
                values[event.target.name] = event.target.value;
                let searchValues = queryString.stringify(values);

                if(event.target.value === '')
                {
                    searchValues = searchValues.replace(encodeURI(event.target.name)+'=', '');
                }

                history.push(
                   '/players/'+(Number(params.page)||1)+'?'+searchValues
                );
            }
        }
    }

    render() {
    const {players} = this.props;

    const clubName = (club) => {
      let id = club['@id'].match(/(\d+)/)[1];

      return (
          <Link to={`/club/${id}`} className='badge badge-success col-12'>{club.name}</Link>
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
                        <input type='text' className='form-control' name='club.name' value={this.state['club.name']} onChange={this.handleChange} onKeyPress={this.onEnterClick} />
                    </th>
                    <th scope="col">Data&nbsp;Urodzenia
                        <input type='text' className='form-control ' name='birthAt' readOnly={true} placeholder='w budowie'/>
                    </th>
                    <th scope="col">Licencja&nbsp;Klubowa
                        <input type='text' className='form-control' name='typeClub' value={this.state.typeClub} onChange={this.handleChange} onKeyPress={this.onEnterClick} /></th>
                    <th scope="col">Licencja&nbsp;Drużynowa
                        <input type='text' className='form-control' name='typeTeam' value={this.state.typeTeam} onChange={this.handleChange} onKeyPress={this.onEnterClick} /></th>
                    <th scope="col">Licencja&nbsp;ważna&nbsp;do
                        <input type='text' className='form-control' name='expiredAt[after]' value={this.state['expiredAt[after]']} onChange={this.handleChange} onKeyPress={this.onEnterClick} /></th>
                  </tr>
                </thead>
                <tbody>
                    {players.map(player => {
                        if(new Date() <= new Date(player.expiredAt) && new Date(Date.now() + 12096e5) >= new Date(player.expiredAt)){
                            return(
                                <tr key={player.id} className='bg-warning text-black border-warning'>
                                    <td>{player.pzbadId}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{clubName(player.club)}</td>
                                    <td>{moment(player.birthAt).format('YYYY-MM-DD')}</td>
                                    <td>{player.typeClub}</td>
                                    <td>{player.typeTeam}</td>
                                    <td>{moment(player.expiredAt).format('YYYY-MM-DD')}</td>
                                </tr>
                            )
                        }

                        if(new Date() <= new Date(player.expiredAt)){
                            return(
                                <tr key={player.id}>
                                    <td>{player.pzbadId}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{clubName(player.club)}</td>
                                    <td>{moment(player.birthAt).format('YYYY-MM-DD')}</td>
                                    <td>{player.typeClub}</td>
                                    <td>{player.typeTeam}</td>
                                    <td>{moment(player.expiredAt).format('YYYY-MM-DD')}</td>
                                </tr>
                            )
                        }

                        return(
                            <tr key={player.id} className='bg-danger text-white border-danger'>
                                <td>{player.pzbadId}</td>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                                <td>{clubName(player.club)}</td>
                                <td>{moment(player.birthAt).format('YYYY-MM-DD')}</td>
                                <td>{player.typeClub}</td>
                                <td>{player.typeTeam}</td>
                                <td>{moment(player.expiredAt).format('YYYY-MM-DD')}</td>
                            </tr>
                        )
                        }
                    )}
                </tbody>
            </table>
        </div>)
    }
}

export default PlayersList;
