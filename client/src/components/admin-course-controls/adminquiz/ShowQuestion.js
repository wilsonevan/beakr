import React from 'react'
import EditQuestion from './EditQuestion'
import styled from 'styled-components'
import {Icon, } from 'semantic-ui-react'

class ShowQuestion extends React.Component {
  state = { question: { ...this.props.question}, editQuestion: false}


  toggleEdit = () => {
    this.setState({ editQuestion: !this.state.editQuestion})
  }


  render () {
    const { index } = this.props
    const { question, editQuestion } = this.state

    return(
      <>
      { editQuestion ?
        <QuestionDiv>
         <EditQuestion question={this.state.question} index={index} editQuestion={editQuestion} />
            <SmallDelete onClick={() => this.props.filterQuestion(index)}><Icon name='trash alternate outline' size='large' /></SmallDelete>
            <SmallEdit onClick={() => this.toggleEdit()}><Icon name='setting' size='large' /></SmallEdit>
        </QuestionDiv>
          :
          <QuestionDiv>
            <h3>Question {index + 1}</h3>
            <h4 style={{margin: 0}}>Type: {question.kind}</h4>
            <h4 style={{margin: 0}}>Points: {question.points_possible}</h4>
            <h4 style={{margin: 0}}>Question: {question.body}</h4>
            {question.choices.map( (choice, index) => 
              <h5 style={{margin: 0}} key={index}>
                Q{index+1}: {choice.text} {choice.correct ? '(Correct)' : ''}
              </h5>
              )}
            <SmallDelete onClick={() => this.props.filterQuestion(index)}><Icon name='trash alternate outline' size='large' /></SmallDelete>
            <SmallEdit onClick={() => this.toggleEdit()}><Icon name='setting' size='large' /></SmallEdit>
          </QuestionDiv>
        }
      </>
    )
  }
}
const QuestionDiv = styled.div`
  box-shadow: 1px 1px 1px 1px #ededed;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 2px solid #ededed;
  padding: 5px;
  position: relative;

`

const SmallDelete = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  position: absolute;
  right: 5px;
  top: 5px;
  
  :hover {
    color: #23a24d;
    cursor: pointer;
  }
`
const SmallEdit = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  position: absolute;
  right: 5px;
  bottom: 5px;
  
  :hover {
    color: #23a24d;
    cursor: pointer;
  }
`

export default ShowQuestion;