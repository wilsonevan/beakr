import React from 'react';
import axios from 'axios';
// import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Header, Icon, } from 'semantic-ui-react';
import QuizStart from "./QuizStart";
import QuestionView from "./QuestionView";

class QuizView extends React.Component {
  state = { title: '', questions: [], quizStarted: false }

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
    const { title, questions, quizStarted } = this.state;
    if(!quizStarted)
      return (
        <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
          <Header style={{ color: '#23A24D' }}>
            <Icon name='block layout' color='green' />
              {title}
          </Header>
          <QuizStart startQuiz={this.startQuiz} />
          {/* <Moment format='ddd, MMM D, LT' date={due_date} /> */} 
        </>
      )
    else return (
      <QuestionView 
        questions={questions} 
        handleCodeChange={this.handleCodeChange}
        handleTextChange={this.handleTextChange}
        selectChoice={this.selectChoice}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default QuizView