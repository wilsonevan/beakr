import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Icon, } from 'semantic-ui-react';
import QuizStart from "./QuizStart";
import QuestionView from "./QuestionView";
import QuizPrompt from "./QuizPrompt";
import QuizSubmissionView from "./QuizSubmissionView";
import { withAuth } from "../../providers/AuthProvider";

class QuizView extends React.Component {
  state = { 
    title: "", 
    body: "",
    due_date: null,
    questions: [], 
    page: "",
    startPrompt: false, 
    submitPrompt: false, 
    validationPrompt: false,
    validationText: "",
    submission: null,
    teacherView: null,
    submissionList: null,
    userName: "",
  }

  componentDidMount() {
    const { course_id, unit_id, id } = this.props.match.params;
    const { user } = this.props;
    const { teacherView } = this.state;
    // console.log(this.props)

    // If the user is an admin, teacherView is true
    // If not an admin, check if role === teacher
    if(user.admin) {
      this.setState({ teacherView: true });
      this.handleTeacherView()
    } else {
      axios.get(`/api/users/${user.id}/courses/${course_id}/enrollments`)
      .then((res) =>{
        if(res.data.role === "student") {
          this.setState({ teacherView: false });
          return this.handleStudentView()
        } else {
          this.setState({ teacherView: true });
          return this.handleTeacherView()
        }
      })
    }
  }

  handleTeacherView = () => {
    const { course_id, unit_id, id } = this.props.match.params;
    return new Promise((resolve, reject) => {
      axios.get(`/api/quizzes/${id}/quiz_submissions`)
      .then((res) => {
        this.setState({ submissionList: res.data });
        return axios.get(`/api/units/${unit_id}/quizzes/${id}/get_quiz_with_attrs`)
      })
      .then( res => {
        const { title, due_date, body } = res.data;
        this.setState({ title, due_date, body, page: "start" });
      })
      .catch((err) => reject(err));
    })
  }

  handleStudentView = () => {
    const { course_id, unit_id, id } = this.props.match.params;
    return new Promise((resolve, reject) => {
      axios.get(`/api/courses/${course_id}/quizzes/${id}/quiz_submissions`)
      .then((res) => {
        if(res.data) this.setState({ submission: res.data, page: "submission" });
        return axios.get(`/api/units/${unit_id}/quizzes/${id}/get_quiz_with_attrs`)
      })
      .then( res => {
        const { title, due_date, body } = res.data;
        this.setState({ title, due_date, body });

        // if we aren't viewing a quiz submission, then get questions and display start
        if(this.state.page !== "submission") {
          this.setState({ page: "start" });
          return axios.get(`/api/quizzes/${id}/questions`)
        }
      })
      .then((res) => {
        if(res) this.setState({ questions: res.data });
      })
      .catch((err) => reject(err));
    })
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
      this.setSubmission(res.data.id);
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
    this.setState({ page: "view" });
  }

  setSubmission = (submission_id) => {
    axios.get(`/api/quiz_submissions/${submission_id}`)
    .then((res) => {
      this.setState({ submission: res.data, page: "submission" })
    })
    .catch((err) => console.log(err));
  }

  unsetSubmission = () => {
    this.setState({ submission: null, page: "start" });
  }

  setUserName = (userName) => {
    this.setState({ userName });
  }

  updatePointsAwarded = (questionIndex, points) => {
    const questions = this.state.submission.questions.map((question, index) => {
      if(questionIndex === index) question.points_awarded = points;
      return question;
    })
    const submission = this.state.submission;
    submission.questions = questions;
    this.setState({ submission });
  }

  setNewGrade = (submission_id, submission_grade) => {
    const submissionList = this.state.submissionList.map((submission) => {
      if(submission.id === submission_id) {
        submission.graded = true;
        submission.grade = submission_grade
      }
      return submission
    })
    this.setState({ submissionList });
  }

  calculateGrades = () => {
    const points_awarded = this.state.submission.questions.reduce((total, question) => {
      const value = parseFloat(question.points_awarded)
      return total += value? value : 0 ;
    }, 0)

    const submission = this.state.submission;
    submission.points_awarded = points_awarded;
    submission.grade = (points_awarded/submission.points_possible) * 100;

    this.setState({ submission });
  }

  submitForGrading = () => {
    const { submission } = this.state;
    axios.put(`/api/quiz_submissions/${submission.id}/calculate_grade`, {quiz_submission: { ...submission} })
    .then((res) => {
      this.setState({ submission: res.data });
    })
    .catch((err) => console.log(err));
  }

  render() {
    const { title, questions, page, startPrompt, submitPrompt, validationPrompt, validationText, due_date, body, teacherView, submission, submissionList, userName } = this.state;
    if(page === "start") return (
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
            teacherView={teacherView}
            submissionList={submissionList}
            setSubmission={this.setSubmission}
            setUserName={this.setUserName}
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
        </>
      ) 
      else if( page === "view" ) return (
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
      else if(page === "submission") return (
        <QuizSubmissionView 
          submission={submission}
          title={title}
          updatePointsAwarded={this.updatePointsAwarded}
          submitForGrading={this.submitForGrading}
          history={this.props.history}
          teacherView={teacherView}
          unsetSubmission={this.unsetSubmission}
          setNewGrade={this.setNewGrade}
          calculateGrades={this.calculateGrades}
          userName={userName}
        />
      )
      else return null
  }
}

export default withAuth(QuizView)