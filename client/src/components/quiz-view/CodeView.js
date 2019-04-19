import React from "react";
import styled from "styled-components";
import Code from "../Code";

const CodeView = ({ question, currentQuestion }) => {
    

    return (
        <>
            <QuestionBody>{ question.body }</QuestionBody>
            <Code 
                value={question.submitted_code}
                onChange={() => null}
            />
        </>
    )
}

const QuestionBody = styled.h3`
    margin: 2rem 0;
`

export default CodeView;