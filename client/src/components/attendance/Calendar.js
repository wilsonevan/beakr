import React from "react";
import dateFns from "date-fns";
import "./Calendar.css";
import OptionsMenu from "./OptionsMenu";
import AttendanceMarks from "./AttendanceMarks";
import AssignmentMarks from "./AssignmentMarks";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { AuthConsumer } from "../../providers/AuthProvider";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    monthEvents: [],
    attendanceView: true,
    assignmentsView: true,
    quizzesView: true,
    attendanceRecords: [],
    assignments: [],
    quizzes: []
  };

  componentDidMount() {
    // Get all of the attendance records for this course
    axios.get("/api/attendances").then(res => {
      // debugger
      this.setState({ attendanceRecords: res.data });
    });
    // Get all of the assignments & quizzes (grades)
    axios
      .get("/api/get_user_grades_assignments", {
        params: { id: this.props.auth.user.id }
      })
      .then(res => {
        this.setState({
          assignments: [...this.state.assignments, ...res.data]
        });
      });
    axios
      .get("/api/get_user_grades_quizzes", {
        params: { id: this.props.auth.user.id }
      })
      .then(res => {
        this.setState({ quizzes: [...this.state.quizzes, ...res.data] });
      });

      axios.get("/api/student_courses", { params: { id: this.props.auth.user.id } }).then(res => {
        res.data.map(course => {
          axios.get("/api/upcoming_assignments", { params: { course_id: course.id } }).then(res => {
            this.setState({ assignments: [...this.state.assignments, ...res.data] });
          });
          axios.get("/api/upcoming_quizzes", { params: { course_id: course.id } }).then(res => {
            this.setState({ quizzes: [...this.state.quizzes, ...res.data] });
          });
        });
      });
   
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            <Icon name="chevron left" />
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">
            <Icon name="chevron right" />
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
    const {
      currentMonth,
      selectedDate,
      attendanceView,
      assignmentsView,
      attendanceRecords,
      assignments,
      quizzes
    } = this.state;
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
        const formattedDateFull = dateFns.format(day, "YYYY-MM-DD");
        let todaysRecord = "";
        if (attendanceRecords.length > 0) {
          attendanceRecords.map(record => {
            if (record.record_date === formattedDateFull) {
              todaysRecord = record.attendance_record;
            }
          });
        }

        let todaysAssignments = [];

        // Add Upcoming Quizzes to assignments array
        if (quizzes.length > 0) {
          quizzes.map(quiz => {
            const quizDate = dateFns.format(quiz.due_date, "YYYY-MM-DD");
            if (quizDate === formattedDateFull) {
              todaysAssignments.push(quiz);
            }
          });
        }

        // Add Upcoming Assignments to assignments array
        if (assignments.length > 0) {
          assignments.map(assignment => {
            const assignmentDate = dateFns.format(
              assignment.due_date,
              "YYYY-MM-DD"
            );
            if (assignmentDate === formattedDateFull) {
              todaysAssignments.push(assignment);
            }
          });
        }


        // Map through and clean up duplicates
        var assignmentsIdList = []
        var quizzesIdList = []
        todaysAssignments = todaysAssignments.filter(assignment => {
          if (assignment.assignment_id)
            if (!assignmentsIdList.includes(assignment.assignment_id)){
              assignmentsIdList.push(assignment.assignment_id)
              return assignment
            }
          else if (assignment.quiz_id)
            if (!quizzesIdList.includes(assignment.quiz_id)){
              quizzesIdList.push(assignment.quiz_id)
              return assignment
            }
        })

        todaysAssignments = todaysAssignments.filter(assignment => assignment)

        // Push all of the data for each specific day
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {/* <p>{ this.dailyEvents(day) }</p> */}
            {/* <p className='absentStatus'></p> */}
            {attendanceView ? (
              <AttendanceMarks attendance={{ record: todaysRecord }} />
            ) : null}
            {assignmentsView ? (
              <AssignmentMarks assignments={todaysAssignments} />
            ) : null}
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

  dailyEvents = todaysDate => {
    let todaysEvents = 0;

    this.state.monthEvents.map(event => {
      if (event.date === todaysDate) {
        todaysEvents++;
      }
    });

    return todaysEvents;
  };

  toggleAttendance = () => {
    this.setState({ attendanceView: !this.state.attendanceView });
  };

  toggleAssignments = () => {
    this.setState({ assignmentsView: !this.state.assignmentsView });
  };

  render() {
    return (
      <>
        <OptionsMenu
          toggleAttendance={this.toggleAttendance}
          toggleAssignments={this.toggleAssignments}
          attendanceView={this.state.attendanceView}
          assignmentsView={this.state.assignmentsView}
        />
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </>
    );
  }
}

class ConnectedCalendar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Calendar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedCalendar;
