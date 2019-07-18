import React from 'react';
import {
  tournamentsFetchCategory,
  tournamentsCalendarSetCategory,
  tournamentsListSetSeason,
  getSeasonList
} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from "reactstrap/es/Button";
import {Switch} from "../Components/Commons/Switch";

const mapStateToProps = state => ({
  userData: state.auth.userData,
  lastSeason: state.lastSeason.lastSeason,
  ...state.tournamentsList,
  ...state.seasonList
});

const mapDispatchToProps = {
  tournamentsFetchCategory: tournamentsFetchCategory,
  tournamentsCalendarSetCategory: tournamentsCalendarSetCategory,
  tournamentsListSetSeason: tournamentsListSetSeason,
  getSeasonList: getSeasonList
};

moment.locale('pl',{
  week:{
    dow : 1
  }
});


const localizer = BigCalendar.momentLocalizer(moment);


class TournamentsCalendarContainer extends React.Component {

  componentDidMount() {
    this.props.getSeasonList();
    this.props.tournamentsFetchCategory(this.getQueryParamCategory(), this.getQueryParamSeason());
  }

  componentDidUpdate(prevProps) {
    const {currentCategory, tournamentsFetchCategory, tournamentsCalendarSetCategory, tournamentsListSetSeason, currentSeason} = this.props;

    if (prevProps.match.params.category !== this.getQueryParamCategory()) {
      tournamentsCalendarSetCategory(this.getQueryParamCategory());
    }

    if (prevProps.currentCategory !== currentCategory) {
      tournamentsFetchCategory(currentCategory, currentSeason);
    }

    if (prevProps.match.params.season !== this.getQueryParamSeason()) {
      tournamentsListSetSeason(this.getQueryParamSeason());
    }

    if (prevProps.currentSeason !== currentSeason) {
      tournamentsFetchCategory(currentCategory, currentSeason);
    }

  }

  checkLastSeason(){
    if(this.props.lastSeason){

      return this.props.lastSeason.last_season;
    }
    else{
      setTimeout(() => this.checkLastSeason(),500);
    }
  }

  getQueryParamSeason() {
    return Number(this.props.match.params.season) || this.checkLastSeason();
  }

  getQueryParamCategory(){
    return Number(this.props.match.params.category) || '';
  }

  onClick(event){
    const {history} = this.props;
    history.push('/tournament-result/'+event.id+'/'+event.playerCategory[0].pzbadId+'/SM')
  }

  changeCategory(e){
      const {history, match,currentSeason} = this.props;

      if(0 === e){
          history.push('/tournaments-calendar/'+match.params.date+'/'+currentSeason+'/');
      }
      else{
          history.push('/tournaments-calendar/'+match.params.date+'/'+currentSeason+'/'+e);
      }
  }

  changeDate(e){
    const {history, currentCategory, currentSeason} = this.props;
    const year = moment(e).format('Y');
    const month = moment(e).format('MM');
    history.push('/tournaments-calendar/'+year+'-'+month+'/'+currentSeason+'/'+currentCategory);
  }

  changeSeason(season) {
    const {history, currentCategory,match} = this.props;
    history.push('/tournaments-calendar/'+match.params.date+'/'+season+'/'+currentCategory);
  }

  render() {
    const {tournaments, isFetching, match,history, currentSeason} = this.props;
    const ButtonView = ({type, className, name, children, onClick}) => {
      return(
          <Button type={type} className={className} name={name} onClick={onClick}>{children}</Button>
      )
    };

    if(!match.params.date){
      const date = new Date();
      const year = moment(date).format('Y');
      const month = moment(date).format('MM');
      history.push('/tournaments-calendar/'+year+'-'+month);
    }

    return (
        <div>
          <Switch changeSeason={this.changeSeason.bind(this)} seasons={this.props.seasons} currentSeason={currentSeason}/>

            <div className="btn-group btn-group-lg" role="group" aria-label="Basic example" style={{marginBottom: 20+'px'}}>
              <ButtonView type="button" className="btn btn-secondary" name='0' onClick={()=>this.changeCategory(0)}>All</ButtonView>
              <ButtonView type="button" className="btn btn-secondary" name='1' onClick={()=>this.changeCategory(1)}>E</ButtonView>
              <ButtonView type="button" className="btn btn-secondary" name='2' onClick={()=>this.changeCategory(2)}>J</ButtonView>
              <ButtonView type="button" className="btn btn-secondary" name='5' onClick={()=>this.changeCategory(5)}>JM</ButtonView>
              <ButtonView type="button" className="btn btn-secondary" name='7' onClick={()=>this.changeCategory(7)}>M</ButtonView>
              <ButtonView type="button" className="btn btn-secondary" name='10' onClick={()=>this.changeCategory(10)}>MM</ButtonView>
            </div>
          {isFetching && <Spinner/>}
          {!isFetching &&
          <div>

            {tournaments && <BigCalendar
                localizer={localizer}
                popup
                events={tournaments}
                startAccessor="startDate"
                endAccessor="endDate"
                titleAccessor="name"
                tooltipAccessor="name"
                defaultDate={new Date(match.params.date)}
                onNavigate={(e)=>this.changeDate(e)}
                views={['month']}
                style={{ height: "80vh" }}
                onSelectEvent={(event)=>this.onClick(event)}
                culture="pl"/>}

          </div>
          }
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsCalendarContainer);
