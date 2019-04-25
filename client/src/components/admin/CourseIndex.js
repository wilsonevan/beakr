import React from "react";
import SearchBar from "../SearchBar";
import styled from "styled-components";
import CourseItem from "./CourseItem";
import { ButtonBlue } from "../../styles/Components";
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
                        <ButtonBlue
                            onClick={this.toggleNewCourse} 
                            style={{margin: "0 2rem", padding: "0.5rem 0.75rem"}}
                        >
                            Add Course
                        </ButtonBlue>
                        </ListHeader>
                        <GreenBackground>
                            <CoursesContainer>
                                <SearchBar 
                                    route={`/api/search_courses`}
                                    width="100%"
                                    height="static"
                                    placeholder="Search Courses..."
                                    render={(props) => <CourseItem { ...props } />}
                                />
                            </CoursesContainer>
                        </GreenBackground>
                    </>
                }
            </>
        )
    }
}

const GreenBackground = styled.div`
    padding: 0 0.75rem 1.25rem 0.75rem;
    background-color: #23a24d;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    margin: 0 auto;
`

const CoursesContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
`

const ListHeader = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.75rem 1.25rem;
  margin: 0;
  font-size: 2rem;
  background-color: #23a24d;
  color: white !important;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`



export default CourseIndex;