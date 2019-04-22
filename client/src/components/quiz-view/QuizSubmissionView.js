import React from "react";
import styled from "styled-components";
import TextView from "./TextView";
import CodeView from "./CodeView";
import ChoiceView from "./ChoiceView";
import { ButtonGreen } from "../../styles/Components";
import { Header, Icon, } from 'semantic-ui-react';


class QuizSubmissionView extends React.Component {

    pointsOptions = (points_possible) => {
        let optionPoints = 0;
        const optionArray = []
        while(optionPoints <= points_possible) {
            optionArray.push(
                <option value={optionPoints} key={optionPoints} >    
                    {optionPoints.toFixed(1)}
                </option>    
            )
            optionPoints += 0.5;
        }
        return optionArray
    }

    handleChange = (event, index, points_possible) => {
        const value = parseFloat(event.target.value)? parseFloat(event.target.value) : "";
        if(value > points_possible || value < 0) return null;
        this.props.updatePointsAwarded(index, value);
        this.props.calculateGrades();
    }

    handleClick = () => {
        this.props.submitForGrading();
        this.props.setNewGrade(this.props.submission.id, this.props.submission.grade);
        this.props.unsetSubmission();
    }

    renderQuestions = () => {
        return this.props.submission.questions.map((question, index) => {
            if(question.kind === "text") return (
                <Question key={index} >
                    <QuestionControls>
                        Question {index + 1}
                        <RightContainer>
                            {this.props.teacherView
                            ? (
                                <PointsAwardedInput 
                                    type="number"
                                    value={question.points_awarded} 
                                    onChange={(event) => this.handleChange(event, index, question.points_possible)}
                                />
                            )
                            : (
                                <Points>
                                    { question.points_awarded }
                                </Points>
                            )
                            }
                            <PointsPossible>
                                / {question.points_possible}
                            </PointsPossible>
                        </RightContainer>
                    </QuestionControls>
                    <TextView 
                        question={question}
                        currentQuestion={index}
                    />
                </Question>
            )
            else if(question.kind === "code") return (
                <Question key={index} >
                    <QuestionControls>
                        Question {index + 1}
                        <RightContainer>
                            {this.props.teacherView
                            ? (
                                <PointsAwardedInput 
                                    type="number"
                                    value={question.points_awarded} 
                                    onChange={(event) => this.handleChange(event, index, question.points_possible)}
                                />
                            )
                            : (
                                <Points>
                                    { question.points_awarded }
                                </Points>
                            )
                            }
                            <PointsPossible>
                                / {question.points_possible}
                            </PointsPossible>
                        </RightContainer>
                    </QuestionControls>
                    <CodeView 
                        question={question}
                        currentQuestion={index}
                    />
                </Question>
            )
            else if(question.kind === "choice") return (
                <Question key={index} >
                    <QuestionControls>
                        Question {index + 1}
                        <RightContainer>
                            <div>
                                <Points>
                                { question.points_awarded }
                                </Points>
                            </div>
                            <PointsPossible>
                                / {question.points_possible}
                            </PointsPossible>
                        </RightContainer>
                    </QuestionControls>
                    <ChoiceView 
                        question={question}
                        currentQuestion={index}
                    />
                </Question>
            )
        })
    }

    render() {
        const { submission, title, teacherView, unsetSubmission, userName } = this.props;
        return (
            <>
                <Header 
                    onClick={() => {
                        teacherView
                        ?  unsetSubmission()
                        : this.props.history.goBack()
                    }} 
                    content='< Back' color='green' 
                    size='huge' textAlign='left'
                    style={{cursor: "pointer", display: "inline"}}
                />
                <Header style={{ color: '#23A24D' }}>
                <Icon name='block layout' color='green' />
                { title }  { userName && `Submission for ${userName}` }
                </Header>
                <SubmissionContainer>
                    <GradeHeading>
                        <h2 style={{margin: "0"}} >{ submission.graded? "Graded" : <span style={{color: "#2979ff", margin: "0"}} > Not Graded </span> }</h2>
                        {this.props.teacherView &&
                            <ButtonGreen onClick={() => this.handleClick()} >
                                Submit Grade
                            </ButtonGreen>
                        }
                        <GradePercent>{ submission.grade.toFixed(1) }%</GradePercent>
                    </GradeHeading>
                    <StyledHr />
                    { this.renderQuestions() }
                    {this.props.teacherView && 
                        <BottomSubmit onClick={() => this.handleClick()} >Submit Grade</BottomSubmit> 
                    }
                </SubmissionContainer>
            </>
        )
    }
}


const SubmissionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 50%;
    width: 100%;
    margin-top: 2rem;
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    padding-top: 1rem;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const GradeHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 1.75rem;
    color: #23a24d;
`

const GradePercent = styled.div`
    font-size: 1.75rem;
`

const StyledHr = styled.hr`
    border: none;
    height: 3px;
    width: 100%;
    background-color: #23a24d;
    margin: 1rem 0;
`

const Question = styled.div`
    border-radius: 10px;
    width: 85%;
    padding: 2rem;
    padding-top: 1rem;
    margin: 4rem auto;
    background-color: #f7f7f7;
    box-shadow: 0 1px 1px 2px rgba(150,150,150,0.2);
`

const QuestionControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #23a24d;
    font-size: 1.5rem;
    color: #23a24d;
    height: 4rem;
`

const RightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20rem;
`

const PointsAwardedInput = styled.input`
    border: none;
    border-radius: 100px;
    width: 7.5rem;
    padding: 0.25rem 0.75rem;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
    color: #23a24d;
`

const PointsPossible = styled.div`
    display: inline-block;
    max-width: 9rem;
    overflow: hidden;
    margin-left: 0.5rem;
`

const Points = styled.div`
    text-align: right;
`

const BottomSubmit = styled.button`
    min-width: 15rem;
    width: 40%;
    padding: 1.5rem 0;
    background-color: #23a24d;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    cursor: pointer;

    :hover {
        color: white;
        background-color: #41c36c;
    }
`

export default QuizSubmissionView;



