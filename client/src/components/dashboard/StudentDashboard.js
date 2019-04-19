import React from "react";
import { Segment, Header } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../attendance/Calendar";
import StudentGradesView from "../gradebook/StudentGradesView";
import DashboardNav from "../DashboardNav";
import CourseItem from "./CourseItem";

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
          rightItems={[{ name: "profile", path: "/profile" }]}
          courses={
            <>
              {this.state.userCourses.length > 0 ? (
                <CoursesContainer>
                  {this.state.userCourses.map(course => {
                    return <CourseItem course={course} />;
                  })}
                </CoursesContainer>
              ) : (
                <></>
              )}
            </>
          }
          calendar={<Calendar />}
          grades={<StudentGradesView />}
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

const CourseOptions = styled.div`
  color: #23a24d

  :hover {
    color: #41c36c;
  }
`;

export default StudentDashboard;
