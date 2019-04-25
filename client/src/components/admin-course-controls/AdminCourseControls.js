import React from "react";
import axios from "axios";
import styled from "styled-components";
import AdminCourseAttendance from './AdminCourseAttendance';
import DashboardNav from "../DashboardNav";
import SectionIndex from "./SectionIndex";
import AdminGradesView from '../gradebook/AdminGradesView';
import { Link } from 'react-router-dom'

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
          <Link to='/dashboard'>
            <SectionHeading>
              {course.title && `${course.title} > Admin Controls`}
            </SectionHeading>
          </Link>
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
  font-size: 1.8rem !important;
  margin-bottom: 1.5rem !important;
  color: #23a24d;
  letter-spacing: 2px;
  width: 80%;
`;

export default AdminCourseControl;
