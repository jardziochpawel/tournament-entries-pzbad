import React from 'react';
import {tournamentsFetchAll} from "../Actions/actions";
import {connect} from "react-redux";
import {Spinner} from "../Components/Commons/Spinner";
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.tournamentsList
});

const mapDispatchToProps = {
  tournamentsFetchAll: tournamentsFetchAll
};

moment.locale('pl',{
  week:{
    dow : 1
  }
});


const localizer = BigCalendar.momentLocalizer(moment);


class TournamentsCalendarContainer extends React.Component {

  componentDidMount() {
    this.props.tournamentsFetchAll();
  }
  onClick(event){
    const {history} = this.props;
    history.push('/tournament-result/'+event.id+'/'+event.playerCategory[0].pzbadId+'/SM')
  }

  render() {
    const {tournaments, isFetching} = this.props;

    if (isFetching) {
      return (<Spinner/>);
    }

    return (
        <div>
          {tournaments && <BigCalendar
              localizer={localizer}
              popup
              events={tournaments}
              startAccessor="startDate"
              endAccessor="endDate"
              titleAccessor="name"
              tooltipAccessor="name"
              defaultDate={new Date()}
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
