import React from 'react';
import ReactQuill from 'react-quill';
import { ButtonGreen } from '../../../styles/Components';
import axios from 'axios';
import CreateQuestions from './CreateQuestions'
import styled from 'styled-components'
import { Icon, } from 'semantic-ui-react'
import ShowQuestion from './ShowQuestion';

class AdminCreateQuiz extends React.Component {
  state = { quizValues: { title: '', body: ''}, addQuestion: false, questions: [], }

  handleChange = (e) => {
    const { name, value } = e.target
    const quizValues = {...this.state.quizValues}
    quizValues[name] = value;

    this.setState({ quizValues })
  }
  handleQuillChange = (value) => {
    const { title }  = this.state.quizValues
    this.setState({quizValues: { title, body: value }})
  }


  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.quizValues.title === ''){
      alert('You must give the quiz a title')
    } else if ( this.state.quizValues.body === '' ) {
      alert('You must fill out quiz instructions')
    } else {
      if (this.state.questions.length < 1){
        alert('You must add questions')
      } else {
      const quiz = {...this.state.quizValues}
      axios.post('/api/quizzes', quiz)
      .then( res => {
        // res.data.id === quiz.id
        this.state.questions.map( question => {
          console.log(question);
          axios.post(`/api/quizzes/${res.data.id}/questions`, question)
        })
        this.setState({ quizValues: {title: '', body: '',}, questions: []})
      })
      }
    }
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

  filterQuestion = (index) => {
    const questions = this.state.questions.filter( (question, i) => (i !== index ))
    this.setState({questions})

  }


  renderQuestions = () => {
      return this.state.questions.map( ( question, index ) => {
        return ( 
          <ShowQuestion key={index} question={question} filterQuestion={this.filterQuestion} index={index} />
      )
      })
  }

  render() {
    const { quizValues: {title, body}, addQuestion, } = this.state

    return (
      <>
      <ContainAll>
        <QuizContainer>

        <h2>
          Quiz Title
        </h2>
        <BodyInput
          required
          autoFocus
          name='title'
          value={title}
          onChange={this.handleChange}
          placeholder='Title'
          />
        <h2>
          Quiz Instructions
        </h2>
        <ReactQuill 
          name='body'
          value={body}
          onChange={this.handleQuillChange} 
          style={{height: '25rem', paddingBottom: '4rem'}}
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
  background: #23a24d;
  padding: 1%;
  border-radius: 5px;
`
const QuizContainer = styled.div`
  background: white;
  width: 50%;
  padding: 10px;
  overflow-wrap: break-word:

`

const QuestionDiv = styled.div`
  box-shadow: 1px 1px 1px 1px #ededed;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 2px solid #ededed;
  padding: 5px;
  position: relative;

`
const BodyTextArea = styled.textarea`
  width: 90%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.5rem;
  border: 2px solid #ededed;
  color: grey;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`
const BodyInput = styled.input`
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
const SimpleDiv = styled.div`
  width: 85%;
  height: 100%;
  overflow-wrap: break-word:
`

export default AdminCreateQuiz