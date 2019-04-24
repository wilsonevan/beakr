import React from "react";
import { Segment, Header } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../attendance/Calendar";
import StudentGradesView from "../gradebook/StudentGradesView";
import DashboardNav from "../DashboardNav";
import CourseItem from "./CourseItem";
import StudentHelpView from './../student-help/StudentHelpView';

class StudentDashboard extends React.Component {
  state = { userCourses: [] };

  componentDidMount() {
    axios.get(`/api/user_courses`).then(res => {
      this.setState({ userCourses: res.data });
    });
  }

  renderUserMenu = () => {
    const {
      auth: { user }
    } = this.props;
    
    return (
      <Segment basic>
        <Header as="h1">Welcome {user.first_name}</Header>
        <DashboardNav
          items={["courses", "calendar", "grades"]}
          rightItems={['help', { name: "profile", path: "/profile" }]}
          courses={ this.state.userCourses.length > 0
            ? (
                <CoursesContainer>
                  { this.state.userCourses.map(course => {
                      return <CourseItem course={course} key={course.id} />;
                    })
                  }
                </CoursesContainer>
              )
            : <NoCourseText>You Are Not Enrolled In A Course Yet</NoCourseText>
          }
          calendar={<Calendar />}
          grades={<StudentGradesView />}
          help={<StudentHelpView />}
        />
      </Segment>
    );
  };

  render() {
    return <>{this.renderUserMenu()}</>;
  }
}

const CoursesContainer = styled.div`
  width: 95%;
  margin: 0 auto 3rem auto;
  padding: 1.25rem;
  text-align: center;
  background-color: #23a24d;
  border-radius: 10px;
`;

const NoCourseText = styled.h2`
  text-align: center;
  margin-top: 2rem !important;
`

export default StudentDashboard;
