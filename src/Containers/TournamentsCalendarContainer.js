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

  render() {
    const {tournaments, isFetching} = this.props;
    console.log(tournaments);

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
              culture="pl"
          />}
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsCalendarContainer);
