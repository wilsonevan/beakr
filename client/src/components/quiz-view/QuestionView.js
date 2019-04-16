import React from "react";
import styled from "styled-components";
import CodeQuestion from "./CodeQuestion";
import ChoiceQuestion from "./ChoiceQuestion";
import TextQuestion from "./TextQuestion";
import { ButtonGreen, ButtonBlue } from "../../styles/Components";

class QuestionView extends React.Component {
    state = { currentQuestion: 0 }

    incCurrentQuestion = () => {
        const currentQuestion = this.state.currentQuestion + 1;
        this.setState({ currentQuestion });
    }

    decCurrentQuestion = () => {
        const currentQuestion = this.state.currentQuestion - 1;
        this.setState({ currentQuestion });
    }

    render() {
        const { questions, handleCodeChange, handleTextChange, selectChoice, toggleSubmitPrompt } = this.props;
        const { currentQuestion } = this.state;
        const lastQuestion = questions.length - 1;
        return (
            <>
                <ButtonContainer>
                    <div className="left-buttons">
                        { 
                            currentQuestion !== 0 
                            && <ButtonGreen onClick={() => this.decCurrentQuestion()} >Back</ButtonGreen> 
                        }
                    </div>
                        
                    <CurrentQuestion>Question Number {currentQuestion + 1}</CurrentQuestion>

                    <div className="right-buttons">
                        { 
                            currentQuestion !== lastQuestion 
                            && <ButtonGreen onClick={() => this.incCurrentQuestion()} >Next</ButtonGreen> 
                        }
                        { 
                            currentQuestion === lastQuestion 
                            && <ButtonBlue onClick={() => toggleSubmitPrompt()} >Submit</ButtonBlue> 
                        }
                    </div>
                </ButtonContainer>
                <QuestionCard> 
                    { questions[currentQuestion].kind === "choice" 
                    && <ChoiceQuestion 
                            question={questions[currentQuestion]} 
                            currentQuestion={currentQuestion}
                            selectChoice={selectChoice}
                       /> 
                    }

                    { questions[currentQuestion].kind === "code" 
                    && <CodeQuestion 
                            question={questions[currentQuestion]} 
                            currentQuestion={currentQuestion}
                            handleCodeChange={handleCodeChange}
                        /> 
                    }

                    { questions[currentQuestion].kind === "text" 
                    && <TextQuestion 
                            question={questions[currentQuestion]} 
                            currentQuestion={currentQuestion}
                            handleTextChange={handleTextChange}
                       /> 
                    }
                </QuestionCard>
            </>
        )
    }
}

const CurrentQuestion = styled.h2`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    color: #23a24d;
    margin: 0;
`

const QuestionCard = styled.div`
    min-width: 50rem;
    max-width: 90%;
    background-radius: white;
    border-radius: 10px;
    background-color: white;
    border-radius: 10px;
    margin: 3rem auto;
    padding: 2rem;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const ButtonContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    padding: 0 2rem;
`

export default QuestionView;