import React from "react";
import styled from "styled-components";


class QuizPrompt extends React.Component{
    render() {
       const { prompt, leftClick, leftText, rightClick, rightText, centerClick, centerText } = this.props;
        return (
            <PromptContainer>
                <WhiteBackground>
                    { prompt && <PromptText>{ prompt }</PromptText> }
                    { leftText && leftClick && <ButtonLeft onClick={() => leftClick()}> { leftText } </ButtonLeft> }
                    { centerText && centerClick && <ButtonCenter onClick={() => centerClick()}> { centerText } </ButtonCenter> }
                    { rightText && rightClick && <ButtonRight onClick={() => rightClick()}> { rightText } </ButtonRight> }
                </WhiteBackground>
            </PromptContainer>
        )
    }
}

const PromptContainer = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background-color: white;
    border-radius: 10px;
    height: 20rem;
    width: 40rem;
`

const WhiteBackground = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    height: calc(100% - 0.5rem);
    width: calc(100% - 0.5rem);
    background-color: #23a24d;
    border-radius: 10px;
    padding: 1rem;
`

const PromptText = styled.h2`
    position: relative;
    top: 1.5rem;
    color: white;
    text-align: center;
`

const ButtonLeft = styled.button`
    position: absolute;
    transform: translate(-50%, -50%);
    left: 30%;
    top: 60%;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: white;
    color: #23a24d;
    letter-spacing: 1.5px;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-size: 1.75rem;
    outline: none;
    transition-duration: 0.2s;

    :hover {
    color: white;
    background-color: #2979ff;
    }

    :active {
    box-shadow: 0 0 0 3px #41c36c;
    background-color: white;
    color: #41c36c;
    }
`

const ButtonRight = styled.button`
    position: absolute;
    transform: translate(-50%, -50%);
    right: 10%;
    top: 60%;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: white;
    color: #23a24d;
    letter-spacing: 1.5px;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-size: 1.75rem;
    outline: none;
    transition-duration: 0.2s;

    :hover {
    color: white;
    background-color: #2979ff;
    }

    :active {
    box-shadow: 0 0 0 3px #41c36c;
    background-color: white;
    color: #41c36c;
    }
`

const ButtonCenter = styled.button`
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 60%;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: white;
    color: #23a24d;
    letter-spacing: 1.5px;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-size: 1.75rem;
    outline: none;
    transition-duration: 0.2s;

    :hover {
    color: white;
    background-color: #2979ff;
    }

    :active {
    box-shadow: 0 0 0 3px #41c36c;
    background-color: white;
    color: #41c36c;
    }
`

export default QuizPrompt;