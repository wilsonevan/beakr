import React from 'react'
import { ButtonGreen } from '../../../styles/Components';
import QuizChoices from './QuizChoices'
// import Choices from './Choices'

class CreateQuestions extends React.Component {
  state = { questionValues: {kind: 'text', body: '', choices: [], points_possible: 0.0,}, addChoice: false }


handleChange = (e) => {
  const { name, value } = e.target
  const questionValues = {...this.state.questionValues}
  questionValues[name] = value;
  this.setState({ questionValues })
}

handleKindChange = (e) => {
  const { quizValues: { kind, body, choices, points_possible},} = this.state
  const { value, } = e.target
  this.setState({questionValues: { kind: value, body, points_possible}, })
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


renderKind = () => {
  const { kind, body, points_possible} = this.state.questionValues
   if (kind === 'choice'){
     return (
     <div>
       <div>
        Question Body
      </div>
      <input 
        required
        name='body'
        value={body}
        onChange={this.handleChange}
    />
    { this.state.addChoice ?
      <QuizChoices 
      choices={this.state.questionValues.choices}
      setChoicesState={this.setChoicesState}
      /> :
      null
    }
      <ButtonGreen onClick={() => this.toggleChoiceForm()}>Add Choice</ButtonGreen>
     </div>
     )
    } else {
    return (
     <>
  <div>
    Question Body
  </div>
  <input 
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
        <div>
        Kind of Question:
      </div>
      <select
        required
        autoFocus
        name='kind'
        value={kind}
        onChange={this.handleChange}
        placeholder='kind' >
          <option value='code'>Code</option>
          <option value='choice'>Multiple Choice</option>
          <option value='text'>Text</option>
        </select>
      <br />
      <br />
        {this.renderKind()}
      <br />
      <br />
      <ButtonGreen onClick={() => this.handleAdd()} style={{marginRight: '10px'}}>Add Question</ButtonGreen>
    </>
    )
  }
}
export default CreateQuestions