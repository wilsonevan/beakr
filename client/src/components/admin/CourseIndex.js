import React from "react";
import SearchBar from "../SearchBar";
import styled from "styled-components";
import CourseItem from "./CourseItem";

class CourseIndex extends React.Component {
    state = {}


    render() {
        return (
            <CoursesContainer>
                <SearchBar 
                    route={`/api/search_courses`}
                    width="100%"
                    height="static"
                    placeholder="Course Name ..."
                    render={(props) => <CourseItem { ...props } />}
                />
            </CoursesContainer>
        )
    }
}

const CoursesContainer = styled.div`
    width: 75%;
    margin: 0 auto 3rem auto;
    padding: 1.25rem;
    text-align: center;
    background-color: #23a24d;
    border-radius: 10px;
`



export default CourseIndex;