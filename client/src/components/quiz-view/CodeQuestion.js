import React from "react";
import styled from "styled-components";
import Code from "../Code";

const CodeQuestion = ({ question, currentQuestion, handleCodeChange}) => {
    

    return (
        <>
            <QuestionBody>{ question.body }</QuestionBody>
            <Code 
                value={question.submitted_code}
                codeChange={(value) => handleCodeChange(value, currentQuestion)}
            />
        </>
    )
}

const QuestionBody = styled.h3`
    margin: 2rem 0;
`

export default CodeQuestion;