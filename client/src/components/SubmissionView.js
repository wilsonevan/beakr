import React from 'react';
import axios from 'axios';
import Code from './Code';
import GradeSubmission from './GradeSubmission';
import { Link } from 'react-router-dom';
import { ButtonGreen, } from '../styles/Components';
import { Segment, Header, Icon, Divider } from 'semantic-ui-react';

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
        this.setState({points_awarded: res.data.points_awarded, graded: res.data.graded, grading: false})
      }) 
  }

  renderSubmission = () => {
    const { assignment, body, url, code } = this.state
    switch(assignment.kind) {
      case 'url':
        return (
          <>
            <div>
              <a target="_blank" href={url}>{url}</a>
            </div>
            <div 
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
          <div 
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
    const { assignment, user, points_awarded, points_possible, grading } = this.state

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Back' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {assignment.title} Submission for {user.first_name} {user.last_name}
        </Header>
        <Segment>
          <div 
            dangerouslySetInnerHTML=
            {this.createMarkup(assignment.body)}
            style={{padding: '15px'}}
          />
          <Divider />
            {this.renderSubmission()}
          <Divider />
            { !grading ?
              <>
                <div>
                  {points_awarded}/{points_possible}
                </div>
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
        </Segment>
      </>
    )
  }
}

export default SubmissionView