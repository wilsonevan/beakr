import React from "react";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/Components";
import Moment from 'react-moment';
import moment from "moment";

const QuizStart = ({ toggleStartPrompt, due_date, body, adminView }) => {
    const beforeDue = moment(Date.now()).isBefore(due_date);
    return(
        <>
            <StartContainer>
                <StartHeading>
                    <h2 style={{margin: "0", color: "#23a24d", fontSize: "1.75rem"}} >Instructions</h2>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Moment format='ddd, MMM D, LT' date={due_date} style={styles.dueDate} /> 
                        { beforeDue && !adminView &&
                            <ButtonGreen 
                                onClick={() => toggleStartPrompt()} 
                            > Start Quiz </ButtonGreen>
                        }
                    </div>
                </StartHeading>
                <StyledHr/>
                <Instructions>
                    { body }
                </Instructions>
            </StartContainer>
        </>
    )
}

const StartContainer = styled.div`
    min-height: 50%;
    width: 100%;
    margin-top: 2rem;
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const StartHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const StyledHr = styled.hr`
    border: none;
    height: 2px;
    width: 100%;
    background-color: #23a24d;
    margin: 1rem 0;
`

const Instructions = styled.div`
    width: 100%;
    text-align: left;
`

const styles = {
    dueDate: {
        fontSize: "1.75rem",
        color: "#23a24d",
        marginRight: "2rem",
    }
}


export default QuizStart;