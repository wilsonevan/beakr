import React from "react";
import dateFns from "date-fns";
import './Calendar.css';
import OptionsMenu from './OptionsMenu'
import AttendanceMarks from "./AttendanceMarks";
import axios from "axios";
import { Icon, } from 'semantic-ui-react';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    monthEvents: [],
    attendanceView: true,
    assignmentsView: true,
    attendanceRecords: [],
  };

  componentDidMount() {
    // Get all of the attendance records for this course
    axios.get('/api/attendances')
      .then( res => {
        // debugger
        this.setState({ attendanceRecords: res.data })
      })
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            <Icon name='chevron left' />
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">
            <Icon name='chevron right' />
          </div>
        </div>
      </div>
    );
  }

  
  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate, attendanceView, attendanceRecords, } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {

        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        // Find today's attendance record
        const formattedDateFull = dateFns.format(day, 'YYYY-MM-DD')
        let todaysRecord = '';
        if (attendanceRecords.length > 0) {
          attendanceRecords.map(record => {
            if (record.record_date == formattedDateFull) {
              todaysRecord = record.attendance_record
            }
          })
        }

        // Push all of the data for each specific day
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {/* <p>{ this.dailyEvents(day) }</p> */}
            {/* <p className='absentStatus'></p> */}
            { attendanceView ? 
              <AttendanceMarks attendance={ {record: todaysRecord} }/>
              :
              null
            }
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };


  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  dailyEvents = (todaysDate) => {
    let todaysEvents = 0;
    
    this.state.monthEvents.map( event => {
      if ( event.date === todaysDate ) {
        todaysEvents++;
      }
    })
    
    return todaysEvents
  }

  toggleAttendance = () => {
    this.setState({ attendanceView: !this.state.attendanceView, })
  }

  toggleAssignments = () => {

  }

  render() {
    return (
			<>
				<OptionsMenu toggleAttendance={ this.toggleAttendance } attendanceView={this.state.attendanceView} />
				<div className="calendar">
					{this.renderHeader()}
					{this.renderDays()}
					{this.renderCells()}
				</div>
		</>
    );
  }
}

export default Calendar;