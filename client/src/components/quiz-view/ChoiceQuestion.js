import React from "react";
import styled from "styled-components";

const ChoiceQuestion = ({ question, currentQuestion, selectChoice }) => {

    const renderOptions = () => {
        return question.choices.map((choice) => {
            if(question.submitted_choice === choice.option)
                return(
                    <Option key={choice.option} onClick={() => selectChoice(choice.option, currentQuestion)} >
                        <SelectedRadio />
                        { choice.text }
                    </Option>
                )
            else return(
                <Option key={choice.option} onClick={() => selectChoice(choice.option, currentQuestion)} >
                    <UnselectedRadio />
                    { choice.text }
                </Option>
            )
        })
    }

    return (
        <>
            <QuestionBody>{ question.body }</QuestionBody>
            <OptionsContainer>
                { renderOptions() }
            </OptionsContainer>

        </>
    )
}

const QuestionBody = styled.h3`
    margin: 2rem 0 1rem 0;
`

const OptionsContainer = styled.div`

`
const Option = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.75rem;
    padding: 0.5rem;
    border-radius: 10px;
    transition-duration: 0.1s;
    cursor: pointer;
    font-size: 1.15rem;
`
const UnselectedRadio = styled.div`
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 100px;
    border: 1px solid #23a24d;
    margin-right: 0.5rem;
`
const SelectedRadio = styled.div`
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 100px;
    background-color: #23a24d;
    margin-right: 0.5rem;
`

export default ChoiceQuestion;