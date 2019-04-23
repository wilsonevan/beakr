import React from 'react'
import { ButtonGreen } from '../../../styles/Components'
import QuizChoices from './QuizChoices'
import styled from 'styled-components'
import { withAlert } from 'react-alert'

// import Choices from './Choices'

class CreateQuestions extends React.Component {
  state = { questionValues: {kind: 'text', body: '', choices: [], points_possible: 0, points_awarded: 0,}, addChoice: false, option: 0}


handleChange = (e) => {
  const { name, value } = e.target
  const questionValues = {...this.state.questionValues}
  if (name === 'points_possible') {
    questionValues[name] = parseFloat(value)  
  } else {
    questionValues[name] = value; }
  this.setState({ questionValues })
}
handleSubmit = (e) => {
  e.preventDefault();
  if ( this.state.questionValues.kind === 'choice' && this.state.questionValues.choices.length >= 2){
    this.handleAdd()
    this.toggleChoiceForm()
  }
  else if (this.state.questionValues.kind != 'choice'){
    this.handleAdd()
    this.toggleChoiceForm()
  } else {
    this.ErrorAlert('Please add at least 2 choices')
  }
    
  }

  ErrorAlert = (message) => this.props.alert.show( message, {
    timeout: 3500, // custom timeout just for this one alert
    type: 'error',
  })



setChoicesState = (choices) => {
  const {questionValues: {kind, body, points_possible, points_awarded}} = this.state
  this.setState({questionValues: {kind, body, choices, points_possible, points_awarded, } } )    
}

handleAdd = () => {
  const questions = [...this.props.questions, this.state.questionValues]
  this.props.setQuestionState(questions)
  this.props.handleAddQuestion()
}

toggleChoiceForm = () => this.setState({ addChoice: !this.state.addChoice })

renderChoices = () => {
  const output_arr = this.state.questionValues.choices.map( (choice, index) => {
    return (<h5 style={{margin: 0}} key={index} >Q{index + 1}: {choice.text} {choice.correct ? '(Correct)': ''}</h5>)
  })
  return output_arr
}

renderKind = () => {
  const { kind, body,} = this.state.questionValues
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
          handleChoiceSubmit={this.handleChoiceSubmit}
        /> : null}
        <ButtonAdd style={{display: 'inline-block'}} onClick={() => this.toggleChoiceForm()}>{this.state.addChoice ? 'Cancel' : 'Add Choice'}</ButtonAdd>
        <br />
        <br />
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
    const { kind, points_possible } = this.state
    return(
      <>
      <form onSubmit={this.handleSubmit} id='question' style={{display: 'inline'}}>
      <FiftyDiv>
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
            <option value='text'>Text</option>
            <option value='code'>Code</option>
            <option value='choice'>Multiple Choice</option>
          </BodyInput>
          </FiftyDiv>
          <FiftyDiv>
            <InputHeader>
              Points Possible
            </InputHeader>
            <BodyNumberInput type='number' required name='points_possible' onChange={this.handleChange} value={points_possible} />
          </FiftyDiv>
          {this.renderKind()}
        <ButtonGreen style={{marginRight: '10px'}}>Add Question</ButtonGreen>
      </form>
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
  const FiftyDiv = styled.div`
    width: 50%;
    padding: 5px;
    display: inline-block;

  `
  const ButtonAdd = styled.div`
  display: flex
  align-items: center;
  justify-content: center;
  background: #23a24d;
  color: white;
  border: 1px solid white;
  padding: 5px;
  box-shadow: 1px 1px 2px #ededed;
  border-radius: 5px;
  margin-top: 3px;
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
  width: 100%;
`


const BodyNumberInput = styled.input`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 5px;
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

export default withAlert()(CreateQuestions)