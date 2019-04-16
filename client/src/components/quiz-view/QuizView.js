import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Header, Icon, } from 'semantic-ui-react';
import QuizStart from "./QuizStart";
import QuestionView from "./QuestionView";
import QuizPrompt from "./QuizPrompt";

class QuizView extends React.Component {
  state = { 
    title: "", 
    body: "",
    due_date: null,
    questions: [], 
    quizStarted: false, 
    startPrompt: false, 
    submitPrompt: false, 
    validationPrompt: false,
    validationText: "",
  }

  componentDidMount() {
    axios.get(`/api/quizzes/${this.props.match.params.id}`)
      .then( res => {
        const { title, due_date, body } = res.data;
        this.setState({ title, due_date, body });
        return axios.get(`/api/quizzes/${this.props.match.params.id}/questions`)
      })
      .then((res) => this.setState({ questions: res.data }))
      .catch((err) => console.log(err));
  }

  handleCodeChange = (value, currentQuestion) => {
    let questions = this.state.questions;
    questions[currentQuestion].submitted_code = value;
    this.setState({ questions });
  }

  handleTextChange = (value, currentQuestion) => {
    let questions = this.state.questions;
    questions[currentQuestion].submitted_text = value;
    this.setState({ questions });
  }

  selectChoice = (option, currentQuestion) => {
    let questions = this.state.questions;
    questions[currentQuestion].submitted_choice = option;
    this.setState({ questions });
  }

  handleSubmit = () => {
    axios.post(`/api/quiz_submissions`, { 
      questions: [...this.state.questions], 
      course_id: this.props.match.params.course_id,
      quiz_id: this.props.match.params.id,
    })
    .then((res) => {
      this.props.history.push("/dashboard");
    })
    .catch((err) => console.log(err));
  }

  validateQuestions = () => {
    let notAnswered = this.state.questions.map((question, index) => {
      if(
        (question.kind === "choice" && !question.submitted_choice)
        || (question.kind === "text" && !question.submitted_text)
        || (question.kind === "code" && !question.submitted_code)
      ) return index;
    }).filter((num) => num + 1); // adding 1 so zero doesn't return falsy

    if(notAnswered.length > 0) {
      this.toggleValidationPrompt();
      const validationText = `Questions ${ notAnswered.map((num, index) => `${ num + 1},` ).join(" ") } have not been answered.`;
      this.setState({ validationText });
      return false;
    }
    return true;
  }

  toggleStartPrompt = () => {
    this.setState({ startPrompt: !this.state.startPrompt });
  }

  toggleSubmitPrompt = () => {
    this.setState({ submitPrompt: !this.state.submitPrompt });
  }

  toggleValidationPrompt = () => {
    this.setState({ validationPrompt: !this.state.validationPrompt });
  }

  startQuiz = () => {
    this.setState({ quizStarted: true });
  }

  render() {
    const { title, questions, quizStarted, startPrompt, submitPrompt, validationPrompt, validationText, due_date, body } = this.state;
    if(!quizStarted)
      return (
        <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
          <Header style={{ color: '#23A24D' }}>
            <Icon name='block layout' color='green' />
              {title}
          </Header>
          <QuizStart 
            toggleStartPrompt={this.toggleStartPrompt} 
            due_date={due_date}
            body={body}
          />
          { startPrompt &&
            <QuizPrompt 
              prompt="Are you sure you want to begin?"
              leftText="Start"
              leftClick={this.startQuiz}
              rightText="Not Yet"
              rightClick={this.toggleStartPrompt}
            />
          }
          <Moment format='ddd, MMM D, LT' date={due_date} /> 
        </>
      )
    else return (
      <>
        <QuestionView 
          questions={questions} 
          handleCodeChange={this.handleCodeChange}
          handleTextChange={this.handleTextChange}
          selectChoice={this.selectChoice}
          handleSubmit={this.handleSubmit}
          toggleSubmitPrompt={this.toggleSubmitPrompt}
          validateQuestions={this.validateQuestions}
        />
        { submitPrompt &&  
            <QuizPrompt 
              prompt="Are you sure you want to submit your quiz?"
              leftText="Submit"
              leftClick={this.handleSubmit}
              rightText="Not Yet"
              rightClick={this.toggleSubmitPrompt}
            />
        }
        { validationPrompt &&  
            <QuizPrompt 
              prompt={validationText}
              centerText="Ok"
              centerClick={this.toggleValidationPrompt}
            />
        }
      </>
    )
  }
}

export default QuizView