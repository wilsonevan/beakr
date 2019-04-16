import React from 'react'
import { ButtonGreen } from '../../../styles/Components';
import QuizChoices from './QuizChoices'
// import Choices from './Choices'

class CreateQuestions extends React.Component {
  state = {kind: 'text', body: '', choices: [], points_possible: 0.0, }

handleSubmit = (e) => {}

handleChange = (e) => {
  const { name, value } = e.target
  this.setState({ [name]: value })
}

setChoicesState = (choices) => {
  this.setState({choices})    
}

handleAdd = () => {
  const questions = [...this.props.questions, this.state]
  this.props.setQuestionState(questions)
  this.props.handleAddQuestion()
}
renderKind = () => {
  const { kind, body, points_possible} = this.state
   if (kind === 'multipleChoice'){
     return (
     <>
      <QuizChoices 
        choices={this.state.choices}
        setChoicesState={this.setChoicesState}
      />
     </>
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
    const { kind, body, points_possible, } = this.state
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
          <option value='multipleChoice'>Multiple Choice</option>
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