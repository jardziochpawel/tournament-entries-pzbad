import React from 'react';
import {tournamentsFetchCategory,tournamentsCalendarSetCategory} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from "reactstrap/es/Button";

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.tournamentsList
});

const mapDispatchToProps = {
  tournamentsFetchCategory: tournamentsFetchCategory,
  tournamentsCalendarSetCategory: tournamentsCalendarSetCategory
};

moment.locale('pl',{
  week:{
    dow : 1
  }
});


const localizer = BigCalendar.momentLocalizer(moment);


class TournamentsCalendarContainer extends React.Component {

  componentDidMount() {
    this.props.tournamentsFetchCategory(this.getQueryParamCategory());
  }

  componentDidUpdate(prevProps) {
    const {currentCategory, tournamentsFetchCategory, tournamentsCalendarSetCategory} = this.props;

    if (prevProps.match.params.category !== this.getQueryParamCategory()) {
      tournamentsCalendarSetCategory(this.getQueryParamCategory());
    }

    if (prevProps.currentCategory !== currentCategory) {
      tournamentsFetchCategory(currentCategory);
    }
  }
  getQueryParamCategory(){
    return Number(this.props.match.params.category) || '';
  }
  onClick(event){
    const {history} = this.props;
    history.push('/tournament-result/'+event.id+'/'+event.playerCategory[0].pzbadId+'/SM')
  }

  changeCategory(e){
      const {history, match} = this.props;

      if(0 === e){
          history.push('/tournaments-calendar/'+match.params.date);
      }
      else{
          history.push('/tournaments-calendar/'+match.params.date+'/'+e);
      }
  }
  changeDate(e){
    const {history, currentCategory} = this.props;
    const year = moment(e).format('Y');
    const month = moment(e).format('MM');
    history.push('/tournaments-calendar/'+year+'-'+month+'/'+currentCategory);
  }
  render() {
    const {tournaments, isFetching, match} = this.props;
    const ButtonView = ({type, className, name, children, onClick}) => {
      return(
          <Button type={type} className={className} name={name} onClick={onClick}>{children}</Button>
      )
    };
    if (isFetching) {
      return (<Spinner/>);
    }
    
    return (
        <div>
          <div className="btn-group btn-group-lg" role="group" aria-label="Basic example" style={{marginBottom: 20+'px'}}>
            <ButtonView type="button" className="btn btn-secondary" name='0' onClick={()=>this.changeCategory(0)}>All</ButtonView>
            <ButtonView type="button" className="btn btn-secondary" name='1' onClick={()=>this.changeCategory(1)}>E</ButtonView>
            <ButtonView type="button" className="btn btn-secondary" name='2' onClick={()=>this.changeCategory(2)}>J</ButtonView>
            <ButtonView type="button" className="btn btn-secondary" name='5' onClick={()=>this.changeCategory(5)}>JM</ButtonView>
            <ButtonView type="button" className="btn btn-secondary" name='7' onClick={()=>this.changeCategory(7)}>M</ButtonView>
            <ButtonView type="button" className="btn btn-secondary" name='10' onClick={()=>this.changeCategory(10)}>MM</ButtonView>
          </div>
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
              culture="pl"
          />}
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsCalendarContainer);
