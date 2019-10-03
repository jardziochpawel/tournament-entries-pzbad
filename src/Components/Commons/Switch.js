import React from 'react';
import {Spinner} from "./Spinner";


export class Switch extends React.Component {

    handlePageChange(season) {
        const {changeSeason} = this.props;
        changeSeason(season.target.value);
    }

  render() {
    const {seasons, isFetching, thisSeason} = this.props;

      if (isFetching) {
          return (<Spinner/>);
      }

      return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <div className="card-title"><h4>Wybierz Sezon</h4></div>
          <div className="card-text">
              <select className='form-control' onChange={this.handlePageChange.bind(this)} value={thisSeason}>
                  {seasons.map((s)=>{
                      return(
                          <option key={s.id} value={s.id} >{s.name}</option>
                      )
                  })}
              </select>
          </div>
        </div>
      </div>
    );
  }
}

