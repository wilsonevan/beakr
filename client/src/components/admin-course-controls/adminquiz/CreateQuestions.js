import React from 'react'
import { ButtonGreen } from '../../../styles/Components';
import QuizChoices from './QuizChoices'
import styled from 'styled-components'
// import Choices from './Choices'

class CreateQuestions extends React.Component {
  state = { questionValues: {kind: 'text', body: '', choices: [], points_possible: 0.0,}, addChoice: false, option: 0}


handleChange = (e) => {
  const { name, value } = e.target
  const questionValues = {...this.state.questionValues}
  questionValues[name] = value;
  this.setState({ questionValues })
}

setChoicesState = (choices) => {
  const {questionValues: {kind, body, points_possible}} = this.state
  this.setState({questionValues: {kind, body, choices, points_possible} } )    
}

handleAdd = () => {
  const questions = [...this.props.questions, this.state.questionValues]
  this.props.setQuestionState(questions)
  this.props.handleAddQuestion()
}

toggleChoiceForm = () => this.setState({ addChoice: !this.state.addChoice })

renderChoices = () => {
  const output_arr = this.state.questionValues.choices.map( (choice, index) => {
    return (<h5 style={{margin: 0}} key={index} >Q{index + 1}: {choice.text}</h5>)
  })
  return output_arr
}

renderKind = () => {
  const { kind, body, points_possible} = this.state.questionValues
   if (kind === 'choice'){
     return (
     <>
       <InputHeader>
        Question Body
      </InputHeader>
      <BodyTextArea
        required
        name='body'
        value={body}
        onChange={this.handleChange}
      />
        {this.renderChoices()}
        { this.state.addChoice ?
        <QuizChoices 
          choices={this.state.questionValues.choices}
          setChoicesState={this.setChoicesState}
          toggleChoiceForm={this.toggleChoiceForm}
          option={this.state.option}
        /> : null}
        <ButtonAdd onClick={() => this.toggleChoiceForm()}>{this.state.addChoice ? 'Cancel' : 'Add Choice'}</ButtonAdd>
     </>
     )
    } else {
    return (
     <>
      <InputHeader>
        Question Body
      </InputHeader>
      <BodyTextArea
        required
        name='body'
        value={body}
        onChange={this.handleChange}
      />
    </>)
  }
}


  render(){
    const { kind, } = this.state
    return(
      <>
        <InputHeader>
        Kind of Question
        </InputHeader>
        <BodyInput
          required
          autoFocus
          name='kind'
          value={kind}
          onChange={this.handleChange}
          placeholder='kind' >
            <option value='code'>Code</option>
            <option value='choice'>Multiple Choice</option>
            <option value='text'>Text</option>
          </BodyInput>
          {this.renderKind()}
        <ButtonGreen onClick={() => this.handleAdd()} style={{marginRight: '10px'}}>Add Question</ButtonGreen>
      </>
    )
  }
}

const BodyTextArea = styled.textarea`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1.5rem;
  border: 2px solid #ededed;
  color: grey;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`
const BodyInput = styled.select`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1.5rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 30px;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
  `
  const ButtonAdd = styled.div`
  display: flex
  align-items: center;
  justify-content: center;
  background: #23a24d;
  color: white;
  border: 1px solid white;
  padding: 3px;
  box-shadow: 1px 1px 2px #ededed;
  border-radius: 5px;
  margin-top: 10px;
  max-width: 150px;

  :hover {
    background: white;
    color: #23a24d;
    border: 1px solid #23a24d;
    cursor: pointer;
  }
`
const InputHeader = styled.h3`
  margin-top: 4px;
  margin-bottom: 3px;
  margin-left: 0;
  margin-right: 0;
`

export default CreateQuestions