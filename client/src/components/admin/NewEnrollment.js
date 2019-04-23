import React from "react";
import axios from "axios";
import styled from "styled-components";
import Select from "react-select";
import SearchBar from "../SearchBar";
import LeftEnrollmentUser from "./LeftEnrollmentUser";
import RightEnrollmentUser from "./RightEnrollmentUser";

class NewEnrollment extends React.Component {
  state = { users: [], selectedCourseId: null, courses: [], searchUpdate: false};

  componentDidMount() {
    axios
      .get("/api/courses")
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(res => console.log(res));
  }

  updateSearch = () => {
    this.setState({ searchUpdate: !this.state.searchUpdate });
  }

  mapOptions = () => {
    return this.state.courses.map(course => ({
      value: course.id,
      label: course.title
    }));
  };

  handleChange = event => {
    this.setState({ selectedCourseId: event.value }, () => {
    });
  };

  createEnrollment = (user_id, course_id) => {
    const { teacher } = this.state;
    if(teacher) {
      axios.post(`/api/enrollments`, { user_id, course_id, role: "staff" })
      .then((res) => {
        this.updateSearch();
      })
      .catch((err) => console.log(err));
    } else {
      axios.post(`/api/enrollments`, { user_id, course_id, role: "student" })
      .then((res) => {
        this.updateSearch();
      })
      .catch((err) => console.log(err));
    }
  }

  deleteEnrollment = (user_id, course_id) => {
    axios.delete(`/api/users/${user_id}/courses/${course_id}/enrollments`)
    .then((res) => this.updateSearch())
    .catch((err) => console.log(err));
  }

  render() {
    const { selectedCourseId, searchUpdate } = this.state;
    return (
      <>
        <CourseContainer>
          <CourseHeading>Select Course</CourseHeading>
          <SelectContainer>
            <Select
              name="selectedCourseId"
              onChange={this.handleChange}
              options={this.mapOptions()}
              placeholder="Search Courses..."
            />
          </SelectContainer>
        </CourseContainer>

        {selectedCourseId && (
          <SearchContainer>
            <LeftContainer>
              <SearchHeading>
                <SearchHeadingText>All Users</SearchHeadingText>
              </SearchHeading>
              <SearchBar
                render={props => (
                  <LeftEnrollmentUser 
                    {...props} 
                    createEnrollment={this.createEnrollment} 
                    selectedCourseId={selectedCourseId} 
                  />
                )}
                route={`/api/search_users_with_role/${selectedCourseId}`}
                height="40rem"
                width="100%"
                placeholder="Search Users To Add ..."
                updateFromParent={searchUpdate}
              />
            </LeftContainer>

            <RightContainer>
              <SearchHeading>
                <SearchHeadingText>Enrolled Students</SearchHeadingText>
              </SearchHeading>
              <SearchBar
                render={props => (
                  <RightEnrollmentUser 
                    {...props} 
                    deleteEnrollment={this.deleteEnrollment} 
                    selectedCourseId={selectedCourseId} 
                  />
                )}
                route={`/api/search_students_enrolled/${selectedCourseId}`}
                height="40rem"
                width="100%"
                placeholder="Search Students Enrolled ..."
                updateFromParent={searchUpdate}
              />
            </RightContainer>
          </SearchContainer>
        )}
      </>
    );
  }
}

const CourseContainer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 10rem;
  width: 50%;
  z-index: 100;
`;

const SelectContainer = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  z-index: 100;
`

const CourseHeading = styled.h2`
  color: #23a24d;
  text-align: center;
  font-family: "Poppins";
  z-index: 100;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-around;  
  align-items: center;
  width: 100%;
  margin-top: 12.5rem; 
`
const SearchHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem; 
  height: 4rem;
`

const SearchHeadingText = styled.h2`
  margin: 0;
  color: white;
  font-family: "Poppins";
  letter-spacing: 2px;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 47.5%;
  padding: 0.75rem;
  background-color: #23a24d;
  border-radius: 10px;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 47.5%;
  padding: 0.75rem;
  background-color: #23a24d;
  border-radius: 10px;
`

export default NewEnrollment;
