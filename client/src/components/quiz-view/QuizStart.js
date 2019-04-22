import React from "react";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/Components";
import Moment from 'react-moment';
import moment from "moment";

const QuizStart = ({ toggleStartPrompt, due_date, body, teacherView, submissionList, setSubmission }) => {
    const beforeDue = moment(Date.now()).isBefore(due_date);

    const createMarkup = (html) => {
        return { __html: html };
    };

    const renderSubmissionList = () => {
        return submissionList.map((submission, index) => {
            return(
                <SubmissionBlock key={ index }>
                    <UserSubmissionBtn onClick={() => setSubmission(submission.id)}>
                        { submission.first_name } { submission.last_name }
                    </UserSubmissionBtn>
                    <GradedBoolean style={{ color: submission.graded? "#23a24d" : "#2979ff" }} >
                        { submission.graded? "Graded" : "Not Graded" }
                    </GradedBoolean>
                    <SubmissionGrade>
                        { submission.grade.toFixed(1) }% 
                    </SubmissionGrade>
                </SubmissionBlock>
            )
        })
    }

    const renderDueDate = () => {
        if(due_date) {
            if(beforeDue) return (
                <Moment format='ddd, MMM D, LT' date={due_date} style={styles.beforeDate} />
            )
            else return (
                <Moment format='ddd, MMM D, LT' date={due_date} style={styles.afterDate} /> 
            )
        } else {
            return <h2>No Due Date</h2>
        }

    }

    return(
        <>
            <StartContainer>
                <StartHeading>
                    <h2 style={{margin: "0", color: "#23a24d", fontSize: "1.75rem"}} >Instructions</h2>
                    <div style={{display: "flex", alignItems: "center"}}>
                        { renderDueDate() }
                        { beforeDue && !teacherView &&
                            <ButtonGreen 
                                onClick={() => toggleStartPrompt()} 
                            > Start Quiz </ButtonGreen>
                        }
                    </div>
                </StartHeading>
                <StyledHr/>
                <Instructions
                    dangerouslySetInnerHTML=
                    {createMarkup(body)}
                    style={{padding: '15px'}}
                > 
                </Instructions>
                { teacherView && 
                    <div>
                        <h1 style={{margin: "4rem 0 2rem 0"}} >Student Submissions</h1>
                        <GreenBackground>
                            <SubmissionContainer>
                                { renderSubmissionList() }
                            </SubmissionContainer>
                        </GreenBackground>
                    </div>
                }
            </StartContainer>
        </>
    )
}

const StartContainer = styled.div`
    min-height: 50%;
    width: 100%;
    margin-top: 2rem;
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const StartHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledHr = styled.hr`
    border: none;
    height: 2px;
    width: 100%;
    background-color: #23a24d;
    margin: 1rem 0;
`

const Instructions = styled.div`
    width: 100%;
    text-align: left;
`

const GreenBackground = styled.div`
    padding: 1.25rem 0.75rem;
    background-color: #23a24d;
    border-radius: 5px;
`

const SubmissionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 5px;
`

const SubmissionBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 3rem;
    text-align: left;
    font-size: 1.25rem;
    border-bottom: 1px solid rgba(150,150,150, 0.1);
`

const UserSubmissionBtn = styled.button`
    height: 100%;
    width: calc(100% / 3);
    padding-left: 0.5rem;
    border: none;
    background-color: transparent;
    color: grey;
    text-align: left;
    cursor: pointer;
    border-right: 1px solid rgba(150,150,150, 0.1);


    :hover {
        background-color: rgba(0,0,0,0.1);
        color: #23a24d;
    }
`

const GradedBoolean = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: calc(100% / 3);
    padding-left: 0.5rem;
    border-left: 1px solid rgba(150,150,150, 0.1);
    border-right: 1px solid rgba(150,150,150, 0.1);
`

const SubmissionGrade = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: calc(100% / 3);
    padding-left: 0.5rem;
    color: grey;
`

const styles = {
    beforeDate: {
        fontSize: "1.75rem",
        color: "#23a24d",
        marginRight: "2rem",
    },

    afterDate: {
        fontSize: "1.75rem",
        color: "#2979ff",
        marginRight: "2rem",
    }
}


export default QuizStart;