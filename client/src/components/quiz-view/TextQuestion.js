import React from "react";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/Components";
import ReactQuill from 'react-quill';

const TextQuestion = ({ question, currentQuestion, handleTextChange }) => {

    return (
        <>
            <QuestionBody>{ question.body }</QuestionBody>
            <ReactQuill 
                name='body'
                value={question.submitted_text}
                onChange={(value) => handleTextChange(value, currentQuestion)} 
                style={{height: '25rem', paddingBottom: '4rem'}}
            />
        </>
    )
}

const QuestionBody = styled.h3`
    margin: 2rem 0;
`

export default TextQuestion;