import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { ButtonGreen } from '../../styles/Components';
import axios from 'axios';
import CreateQuestions from './CreateQuestions'

class AdminCreateQuiz extends React.Component {
  state = { quizValues: { title: '', due_date: '',}, addQuestion: false, questions: []}

  handleChange = (e) => {
    const { name, value } = e.target
    const { due_date, } = this.state.quizValues
    this.setState({ quizValues: {[name]: value, due_date, }})
  }

  handleDateChange = (value) => {
    const {title, } = this.state.quizValues
    this.setState({ quizValues: { title, due_date: value} })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const quiz = {...this.state.quizValues}
    axios.post('/api/quizzes', quiz)
      .then( res => {
        // res.data.id === quiz.id
        this.state.questions.map( question => {
          axios.post(`/api/quizzes/${res.data.id}/questions`, question).then( res => {debugger})
        })
        this.setState({ quizValues: {title: '', due_date: '',}, questions: []})
      })
  }
  setQuestionState = (questions) => {
    this.setState({questions})    
  }

  handleAddQuestion = () => this.setState({addQuestion: !this.state.addQuestion})

  renderQuestionForm = () => (
    <CreateQuestions 
      questions={this.state.questions}
      setQuestionState={this.setQuestionState}
      handleAddQuestion={this.handleAddQuestion}
    />
  )

  renderQuestions = () => {
      return this.state.questions.map( question => {
       return ( <div>
          <h1>
            {question.kind}
          </h1>
          <h1>
            {question.body}
          </h1>
        </div>)
      }
      )
  }

  render() {
    const { quizValues: {title, due_date}, addQuestion, } = this.state

    return (
      <>
        <div>
          Quiz Title
        </div>
        <input 
          required
          autoFocus
          name='title'
          value={title}
          onChange={this.handleChange}
          placeholder='Title'
        />
        <br />
        <br />
        <div>
          Due Date
        </div>
        <DateTimePicker 
          required
          value={due_date}
          disableClock
          onChange={this.handleDateChange}
        />
        <br />
        {this.renderQuestions()}
        <br />
        {addQuestion ? this.renderQuestionForm() : null}
        <ButtonGreen onClick={() => this.handleAddQuestion()}>
          {addQuestion ? 'Cancel' : 'Create Question'}
        </ButtonGreen>

        <br />
        <br />
        <ButtonGreen onClick={this.handleSubmit}>
          Create Quiz
        </ButtonGreen>
      </>
    )
  }
}

export default AdminCreateQuiz