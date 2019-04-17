import React from "react";
import SearchBar from "../SearchBar";
import styled from "styled-components";
import CourseItem from "./CourseItem";
import { ButtonGreen } from "../../styles/Components";
import AddCourse from "../admin/AddCourse";

class CourseIndex extends React.Component {
    state = { toggleNewCourse: false, }

    toggleNewCourse = () => this.setState({ toggleNewCourse: !this.state.toggleNewCourse });

    render() {
        return (
            <>
                {this.state.toggleNewCourse
                ?
                    <AddCourse
                        toggleNewCourse={this.toggleNewCourse}
                        resetCourseList={this.resetCourseList}
                    />
                :
                    <>
                        <ListHeader>
                            All Courses
                        <ButtonGreen 
                            onClick={this.toggleNewCourse} 
                            style={{margin: "0 1rem"}}>
                            Add Course
                        </ButtonGreen>
                        </ListHeader>
                        <CoursesContainer>
                            <SearchBar 
                                route={`/api/search_courses`}
                                width="100%"
                                height="static"
                                placeholder="Course Name ..."
                                render={(props) => <CourseItem { ...props } />}
                            />
                        </CoursesContainer>
                    </>
                }
            </>
        )
    }
}

const CoursesContainer = styled.div`
    width: 95%;
    margin: 0 auto 3rem auto;
    padding: 1.25rem;
    text-align: center;
    background-color: #23a24d;
    border-radius: 10px;
`

const ListHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-family: "Poppins";
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 2px;
`



export default CourseIndex;