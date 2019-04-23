import React from 'react';
import axios from 'axios';
import Code from './Code';
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
    const { assignment, body, url, code, points_awarded, points_possible, grading } = this.state
    switch(assignment.kind) {
      case 'url':
        return (
          <Submission>
            <SubmissionControls>
              Submission
              <RightContainer>
                <Points>
                  { points_awarded }
                </Points>
                <PointsPossible>
                   /{ points_possible }
                </PointsPossible>
              </RightContainer>
            </SubmissionControls>
              <SubmissionBody>
                Submission URL: <a target="_blank" href={url}>{url}</a>
              </SubmissionBody>
              <SubmittedText 
                dangerouslySetInnerHTML=
                {this.createMarkup(body)}
                style={{padding: '15px'}}
              />
              { !grading ?
                <> 
                  <br />
                  <ButtonGreen onClick={this.toggleGrading}>
                    Grade Submission
                  </ButtonGreen>
                </>
              :
                <GradeSubmission 
                  submitGrade={this.gradeSubmission} 
                  toggle={this.toggleGrading} 
                  points_awarded={points_awarded} 
                  points_possible={points_possible}
                />
              }
          </Submission>
        )
      case 'code':
        return (
          <Submission>
            <SubmissionControls>
              Submission
              <RightContainer>
                <Points>
                  { points_awarded }
                </Points>
                <PointsPossible>
                   /{ points_possible }
                </PointsPossible>
              </RightContainer>
            </SubmissionControls>
            <Code value={code} />
            <SubmittedText 
              dangerouslySetInnerHTML=
              {this.createMarkup(body)}
              style={{padding: '15px'}}
            />
          </Submission>
        )
      case 'none':
        return (
          <Submission>
            <SubmissionControls>
              Submission
              <RightContainer>
                <Points>
                  { points_awarded }
                </Points>
                <PointsPossible>
                   /{ points_possible }
                </PointsPossible>
              </RightContainer>
            </SubmissionControls>
            <SubmittedText 
              dangerouslySetInnerHTML=
              {this.createMarkup(body)}
              style={{padding: '15px'}}
            />
          </Submission>
        )
      default:
        break
    };
  }

  toggleGrading = () => {
    this.setState({ grading: !this.state.grading })
  }

  render() {
    const { assignment, user, grade, graded } = this.state

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Back' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {assignment.title} Submission for {user.first_name} {user.last_name}
        </Header>
        <SubmissionContainer>
          <GradeHeading>
            <h2 style={{margin: "0"}} >{ graded? "Graded" : <span style={{color: "#2979ff", margin: "0"}} > Not Graded </span> }</h2>
            <GradePercent>{ grade }%</GradePercent>
          </GradeHeading>
          <StyledHr/>
          <Instructions 
            dangerouslySetInnerHTML=
            {this.createMarkup(assignment.body)}
            style={{padding: '15px'}}
          />
          <Divider />
            {this.renderSubmission()}
        </SubmissionContainer>
      </>
    )
  }
}

const SubmissionContainer = styled.div`
    min-height: 50%;
    width: 100%;
    margin-top: 2rem;
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    padding-top: 1rem;
    box-shadow: 0 1px 2px 1px rgba(150,150,150,0.1);
`

const GradeHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.75rem;
    color: #23a24d;
`

const GradePercent = styled.div`
    font-size: 1.75rem;
`

const StyledHr = styled.hr`
    border: none;
    height: 3px;
    width: 100%;
    background-color: #23a24d;
    margin: 1rem 0;
`

const Instructions = styled.div`
  width: 100%;
  text-align: left;
`

const Submission = styled.div`
    border-radius: 10px;
    width: 85%;
    padding: 2rem;
    padding-top: 1rem;
    margin: 4rem auto;
    background-color: #f7f7f7;
    box-shadow: 0 1px 1px 2px rgba(150,150,150,0.2);
`

const SubmissionControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #23a24d;
    font-size: 1.5rem;
    color: #23a24d;
    height: 4rem;
`

const RightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20rem;
`

const PointsPossible = styled.div`
    display: inline-block;
    max-width: 9rem;
    overflow: hidden;
`

const Points = styled.div`
    text-align: right;
`

const SubmissionBody = styled.h3`
    margin: 2rem 0;
`

const SubmittedText = styled.div`
    border: 1px solid grey;
    border-radius: 10px;
    min-height: 20rem;
`

export default SubmissionView