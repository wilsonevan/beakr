import React from "react";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/Components";

const QuizStart = ({ toggleStartPrompt, due_date, body }) => {
    return(
        <>
            <Instructions>
                Instructions
                { body }
                <br/>
                <ButtonGreen 
                    onClick={() => toggleStartPrompt()} 
                    style={{marginTop: "2rem"}}
                > Start Quiz </ButtonGreen>
            </Instructions>
        </>
    )
}

const Instructions = styled.div`
    height: 75vh;
    width: 100%;
    margin-top: 2rem;
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

export default QuizStart;