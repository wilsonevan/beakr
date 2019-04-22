import React from "react";
import axios from "axios";
import styled from "styled-components";
import AdminCourseAttendance from './AdminCourseAttendance';
import DashboardNav from "../DashboardNav";
import SectionIndex from "./SectionIndex";
import AdminGradesView from '../gradebook/AdminGradesView';

class AdminCourseControl extends React.Component {
  state = {course: null}

    componentDidMount() {
    axios
      .get(`/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ course: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { course } = this.state;
    if(this.state.course) {
      return (
        <>
          <SectionHeading>
            {course.title && `${course.title} > Admin Controls`}
          </SectionHeading>
          <DashboardNav 
            items={["edit", {name: "view", path: `/courses/${this.props.match.params.id}`, newTab: true }, "grades", "attendance"]}
            edit={<SectionIndex courseId={course.id} />}
            grades={<AdminGradesView courseId={course.id} />}
            attendance={<AdminCourseAttendance courseId={course.id} />}
          />  
        </>
      ) 
    } else {
      return ( 
        <h1>loading...</h1>
      )
    }
  }
}

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: #23a24d;
  letter-spacing: 2px;
  width: 80%;
`;

export default AdminCourseControl;
