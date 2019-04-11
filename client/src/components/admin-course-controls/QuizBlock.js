import React from "react";
import styled from "styled-components";

const QuizBlock = ({ quiz, unit, index, deleteUnitQuiz }) => (
  <BlockContainer>
    <Knob>
      <Number>{index + 1}</Number>
    </Knob>
    <QuizBlockText onClick={() => deleteUnitQuiz(quiz.id)}>
      <Tag>quiz:</Tag> {quiz.title}
    </QuizBlockText>
    <Buttons>
      <ButtonLeft onClick={() => deleteUnitQuiz(quiz.id)}>
        Remove
      </ButtonLeft>
      <ButtonRight
        href={`/quizzes/${quiz.id}`}
        target="_blank"
      >
        View
      </ButtonRight>
    </Buttons>
  </BlockContainer>
);

const BlockContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 1rem auto;
`;

const QuizBlockText = styled.button`
  display: inline-block;
  width: 60%;
  min-width: 30%;
  text-align: left;
  color: grey;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: left;

  :hover {
    color: #0029ff;
  }
`;

const Tag = styled.span`
  font-size: 0.85rem;
  vertical-align: middle;
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
`;

const ButtonLeft = styled.a`
  padding: 0.25rem 0.5rem;
  background-color: #0029ff;
  border: none;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  color: white;
  font-size: 1rem;
  font-family: "Poppins";
  cursor: pointer;

  :hover {
    color: white;
  }
`;
const ButtonRight = styled.a`
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  background-color: #bdbdbd;
  border: none;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  color: white;
  font-size: 1rem;
  font-family: "Poppins";
  cursor: pointer;

  :hover {
    color: white;
  }
`;

const Knob = styled.div`
  position: relative;
  top: 0.12rem;
  height: 2rem;
  width: 2rem;
  border: 3px solid #0029ff;
  border-radius: 100px;
  background-color: rgba(100, 100, 100, 0.1);
  margin-right: 0.75rem;
  cursor: grab;
`;

const Number = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  color: #0029ff;
`;

export default QuizBlock;
