import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { ButtonGreen } from '../../../styles/Components';
import axios from 'axios';
import CreateQuestions from './CreateQuestions'
import styled from 'styled-components'

class AdminCreateQuiz extends React.Component {
  state = { quizValues: { title: '', due_date: '',}, addQuestion: false, questions: [],}

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
          console.log(question);
          axios.post(`/api/quizzes/${res.data.id}/questions`, question)
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
      let amount = 0
      return this.state.questions.map( question => {
        amount = amount + 1
        return ( <QuestionDiv>
          <h3>Question {amount}</h3>
          <h4 style={{margin: 0}}>Type: {question.kind}</h4>
          <h4 style={{margin: 0}}>Question: {question.body}</h4>
          {question.choices.map( choice => 
            <h6>
              {choice.text}
            </h6>
            )}
          </QuestionDiv>)
      }
      )
  }

  render() {
    const { quizValues: {title, due_date}, addQuestion, } = this.state

    return (
      <>
      <ContainAll>
        <QuizContainer>

        <h2>
          Quiz Title
        </h2>
        <input 
          required
          autoFocus
          name='title'
          value={title}
          onChange={this.handleChange}
          placeholder='Title'
          />
        <h2>
          Due Date
        </h2>
        <DateTimePicker 
          required
          value={due_date}
          disableClock
          onChange={this.handleDateChange}
          />
        </QuizContainer>
        <QuizContainer>

        {this.renderQuestions()}
        {addQuestion ? this.renderQuestionForm() : null}
        <ButtonGreen onClick={() => this.handleAddQuestion()}>
          {addQuestion ? 'Cancel' : 'Create Question'}
        </ButtonGreen>
        </QuizContainer>
      </ContainAll>
        <ButtonGreen style={{marginTop: '10px'}} onClick={this.handleSubmit}>
          Create Quiz
        </ButtonGreen>
        </>
    )
  }
}

const ContainAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
  background: #23a24d
  padding: 1%;
  border-radius: 10px;
`
const QuizContainer = styled.div`
  background: white;
  width: 50%;
  padding: 10px;
`

const QuestionDiv = styled.div`
  box-shadow: 1px 1px 1px 1px #ededed;
  border-radius: 6px;
  margin-bottom: 15px;

`

export default AdminCreateQuiz