import React from "react";
import styled from "styled-components";
import TextView from "./TextView";
import CodeView from "./CodeView";
import ChoiceView from "./ChoiceView";


class QuizSubmissionView extends React.Component {

    renderQuestions = () => {
        return this.props.submission.questions.map((question, index) => {
            if(question.kind === "text") return (
                <Question key={index} >
                    <QuestionControls>
                        Question {index + 1}
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
        const { submission } = this.props;
        console.log(submission)
        return (
            <SubmissionContainer>
                <GradeHeading>
                    <h1>{ submission.graded?  "Graded" : <span style={{color: "#2979ff"}} > Not Graded </span> }</h1>
                    <GradePercent>{ submission.grade.toFixed(1) }%</GradePercent>
                </GradeHeading>
                { this.renderQuestions() }
            </SubmissionContainer>
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
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const GradeHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #23a24d;
    color: #23a24d;
`

const GradePercent = styled.div`
    font-size: 1.75rem;
`

const Question = styled.div`
    // border: 1px solid grey;
    border-radius: 10px;
    width: 85%;
    padding: 2rem;
    margin: 4rem auto;
    background-color: #f7f7f7;
    box-shadow: 0 1px 1px 2px rgba(150,150,150,0.2);
`

const QuestionControls = styled.div`
    border-bottom: 1px solid #23a24d;
`

export default QuizSubmissionView;



