import React from 'react';
import axios from 'axios';
// import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Header, Icon, } from 'semantic-ui-react';
import QuizStart from "./QuizStart";
import QuestionView from "./QuestionView";
import QuizPrompt from "./QuizPrompt";

class QuizView extends React.Component {
  state = { 
    title: '', 
    questions: [], 
    quizStarted: false, 
    startPrompt: false, 
    submitPrompt: false, 
    validationPrompt: false 
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

  toggleStartPrompt = () => {
    this.setState({ startPrompt: !this.state.startPrompt });
  }

  toggleSubmitPrompt = () => {
    this.setState({ submitPrompt: !this.state.submitPrompt });
  }

  toggleValidationPrompt = () => {
    this.setState({ validationPrompt: !this.state.validationPrompt });
  }

  componentDidMount() {
    axios.get(`/api/quizzes/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ title: res.data.title });
        return axios.get(`/api/quizzes/${this.props.match.params.id}/questions`)
      })
      .then((res) => this.setState({ questions: res.data }))
      .catch((err) => console.log(err));
  }

  startQuiz = () => {
    this.setState({ quizStarted: true });
  }

  render() {
    const { title, questions, quizStarted, startPrompt, submitPrompt, validationPrompt } = this.state;
    console.log(submitPrompt);
    if(!quizStarted)
      return (
        <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
          <Header style={{ color: '#23A24D' }}>
            <Icon name='block layout' color='green' />
              {title}
          </Header>
          <QuizStart toggleStartPrompt={this.toggleStartPrompt} />
          { startPrompt &&
            <QuizPrompt 
              prompt="Are you sure you want to begin?"
              leftText="Start"
              leftClick={this.startQuiz}
              rightText="Not Yet"
              rightClick={this.toggleStartPrompt}
            />
          }
          {/* <Moment format='ddd, MMM D, LT' date={due_date} /> */} 
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
      </>
    )
  }
}

export default QuizView