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

    handleChange = (event, index) => {
        this.props.updatePointsAwarded(index, event.target.value);
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
                                <SelectContainer>
                                    <select 
                                        value={question.points_awarded} 
                                        onChange={(event) => this.handleChange(event, index)} >
                                        { this.pointsOptions(question.points_possible) }
                                    </select>
                                </SelectContainer>
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
                                <SelectContainer>
                                    <select 
                                        value={question.points_awarded} 
                                        onChange={(event) => this.handleChange(event, index)} >
                                        { this.pointsOptions(question.points_possible) }
                                    </select>
                                </SelectContainer>
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
                            <SelectContainer>
                                <Points>
                                { question.points_awarded }
                                </Points>
                            </SelectContainer>
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
        const { submission, title, teacherView, unsetSubmission } = this.props;
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
                    { title }
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
                </SubmissionContainer>
            </>
        )
    }
}


const SubmissionContainer = styled.div`
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

const SelectContainer = styled.div`
    margin-right: 0.5rem;
    z-index: 100;
`
const PointsPossible = styled.div`
    display: inline-block;
    max-width: 9rem;
    overflow: hidden;
`

const Points = styled.div`
    text-align: right;
`

export default QuizSubmissionView;



