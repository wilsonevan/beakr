import React from 'react'
import { ButtonGreen } from '../../styles/Components';

class CreateQuestions extends React.Component {
  state = {kind: 'text', body: '', choices: [], points_possible: 0.0, }

handleSubmit = (e) => {}

handleChange = (e) => {
  const { name, value } = e.target
  this.setState({ [name]: value })
}

handleAdd = () => {
  const questions = [...this.props.questions, this.state]
  // const question = {...this.state}
  // this.props.questions.push(question)
  this.props.setQuestionState(questions)
  this.props.handleAddQuestion()
}


  render(){
    const { kind, body, points_possible, } = this.state
    return(
      <>
        <div style={{marginTop: '20px'}}>
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
      <div>
        Question Body
      </div>
      <input 
        required
        name='body'
        value={body}
        onChange={this.handleChange}
      />
      <br />
      <br />
      <ButtonGreen onClick={() => this.handleAdd()} style={{marginRight: '10px'}}>Add Question</ButtonGreen>
    </>
    )
  }
}
export default CreateQuestions