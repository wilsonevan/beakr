import React from 'react';
import axios from 'axios';
import Code from './Code';
import Moment from 'react-moment';
import GradeSubmission from './GradeSubmission';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonGreen, } from '../styles/Components';
import { Header, Icon, Divider } from 'semantic-ui-react';

class SubmissionView extends React.Component {
  state = { 
    body: '', url: '', code: '', 
    points_awarded: 0, points_possible: 0, 
    grade: '', graded: false, 
    assignment: {}, user: {}, 
    grading: false 
  }

  componentDidMount() {
    const { assignment_id, id } = this.props.match.params
    axios.get(`/api/assignments/${assignment_id}`)
      .then( res => {
        this.setState({ assignment: res.data })
      })
    axios.get(`/api/assignments/${assignment_id}/assignment_submissions/${id}`)
      .then( res => {
        const { body, url, code, points_awarded, points_possible, graded, grade } = res.data 
        this.setState({ body, url, code, points_awarded, points_possible, graded, grade })
      })
    axios.get(`/api/assignments/${assignment_id}/assignment_submissions/${id}/find_user`)
      .then( res => {
        this.setState({ user: res.data })
      })
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  gradeSubmission = (assignment_submission) => {
    const { assignment_id, id } = this.props.match.params
    axios.put(`/api/assignments/${assignment_id}/assignment_submissions/${id}`, assignment_submission)
      .then(res => {
        this.setState({points_awarded: res.data.points_awarded, grade: res.data.grade, graded: res.data.graded, grading: false})
      }) 
  }

  renderSubmission = () => {
    const { assignment, body, url, code } = this.state
    switch(assignment.kind) {
      case 'url':
        return (
          <>
            <Instructions>
              <a target="_blank" href={url}>{url}</a>
            </Instructions>
            <Instructions 
            dangerouslySetInnerHTML=
            {this.createMarkup(body)}
            style={{padding: '15px'}}
            />
          </>
        )
      case 'code':
        return (
          <Code value={code} />
        )
      case 'none':
        return (
          <Instructions 
            dangerouslySetInnerHTML=
            {this.createMarkup(body)}
            style={{padding: '15px'}}
          />
        )
      default:
        break
    };
  }

  toggleGrading = () => {
    this.setState({ grading: !this.state.grading })
  }

  render() {
    const { assignment, user, points_awarded, points_possible, grading, grade, } = this.state

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Back' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {assignment.title} Submission for {user.first_name} {user.last_name}
        </Header>
        <AssignmentContainer>
          <AssignmentHeading>
            <h2 style={{margin: "0", color: "#23a24d", fontSize: "1.75rem"}} >Instructions</h2>
            <div style={{display: "flex", alignItems: "center"}}>
              <Moment format='ddd, MMM D, LT' date={assignment.due_date} style={styles.dueDate} /> 
            </div>
          </AssignmentHeading>
          <StyledHr/>
          <Instructions 
            dangerouslySetInnerHTML=
            {this.createMarkup(assignment.body)}
            style={{padding: '15px'}}
          />
          <Divider />
            {this.renderSubmission()}
          <Divider />
            { !grading ?
              <>
                <Instructions>
                  {points_awarded}/{points_possible}
                </Instructions>
                <Instructions>
                  Grade:{grade}%
                </Instructions>
                <ButtonGreen onClick={this.toggleGrading}>
                  Grade Submission
                </ButtonGreen>
              </>
            :
              <>
                <GradeSubmission 
                  submitGrade={this.gradeSubmission} 
                  toggle={this.toggleGrading} 
                  points_awarded={points_awarded} 
                  points_possible={points_possible}
                />
              </>
            }
        </AssignmentContainer>
      </>
    )
  }
}

const AssignmentContainer = styled.div`
  min-height: 50%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const AssignmentHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Instructions = styled.div`
  width: 100%;
  text-align: left;
`

const styles = {
  dueDate: {
      fontSize: "1.75rem",
      color: "#23a24d",
      marginRight: "2rem",
  }
}

const StyledHr = styled.hr`
  border: none;
  height: 2px;
  width: 100%;
  background-color: #23a24d;
  margin: 1rem 0;
`

export default SubmissionView