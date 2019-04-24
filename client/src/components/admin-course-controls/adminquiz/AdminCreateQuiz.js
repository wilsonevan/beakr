import React from 'react';
import ReactQuill from 'react-quill';
import { ButtonGreen } from '../../../styles/Components';
import axios from 'axios';
import CreateQuestions from './CreateQuestions'
import styled from 'styled-components'
import ShowQuestion from './ShowQuestion';
import { withAlert } from 'react-alert'


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

  handleSetQuestionState = (index, question) => {
    const { quizValues, addQuestion } = this.state
    const questions = this.state.questions;
    questions[index] = question
    this.setState({ quizValues, addQuestion, questions, })
  }

  SuccessAlert = (message) => this.props.alert.show( message, {
    timeout: 4000, // custom timeout just for this one alert
    type: 'success',

  })
  ErrorAlert = (message) => this.props.alert.show( message, {
    timeout: 4000, // custom timeout just for this one alert
    type: 'error',
  })


  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.quizValues.title === ''){
      this.ErrorAlert('Please enter a title')
    } else if ( this.state.quizValues.body === '' ) {
      this.ErrorAlert('please enter instructions')
    } else {
      if (this.state.questions.length < 1){
        this.ErrorAlert('please add questions')
      } else {
      const quiz = {...this.state.quizValues}
      axios.post('/api/quizzes', quiz)
      .then( res => {
        this.state.questions.map( question => {
          axios.post(`/api/quizzes/${res.data.id}/questions`, question)
          this.SuccessAlert('Quiz created successfully')
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
          <ShowQuestion key={index} question={question} handleSetQuestionState={this.handleSetQuestionState} filterQuestion={this.filterQuestion} index={index} />
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
          modules={modules}
          formats={formats}
          onChange={this.handleQuillChange} 
          style={{height: '25rem', paddingBottom: '4rem', marginBottom: '1rem'}}
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


const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
     [{'color': []}, {'background': []}],
    ['link', 'code-block', 'image', 'video'],
    ['clean']
  ]
}
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background',
  'list', 'bullet', 'indent',
  'link', 'code-block', 'image', 'video'
]

export default withAlert()(AdminCreateQuiz)