import React, { useCallback } from "react";
import styled from "styled-components";

const RightEnrollmentUser = ({result, deleteEnrollment, selectedCourseId}) => {
    return (
        <UserContainer onClick={() => deleteEnrollment(result.id, selectedCourseId)} >
            { result.first_name } { result.last_name } 
            <MinusContainer>-</MinusContainer>
        </UserContainer>
    )
}

const UserContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    border-bottom: 1px solid rgba(100,100,100, 0.1);
    cursor: pointer;
    transition-duration: 0.1s;

    :hover {
        background-color: rgba(100,100,100, 0.1);
        color: #0029ff;
    }
`

const MinusContainer = styled.button`
    position: relative;
    height: 1.25rem;
    width: 1.25rem;
    padding: 0;
    background-color: #0029ff;
    color: white;
    border: none;
    border-radius: 100px;
    margin-left: 0.5rem;
    cursor: pointer;
`


export default RightEnrollmentUser;