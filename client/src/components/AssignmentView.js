import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import { Header, Icon, } from 'semantic-ui-react';
import { ButtonGreen } from '../styles/Components';
import AssignmentSubmissionForm from './AssignmentSubmissionForm';
import EditAssignmentTitle from './EditAssignmentTitle';
import EditAssignmentBody from './EditAssignmentBody';
import UserSubmissionView from './UserSubmissionView';

class AssignmentView extends React.Component {
  state = { 
    id: '', title: '', body: '', kind: '', due_date: '', points_possible: '', 
    submissions: [], 
    userSubmission: false, editingTitle: false, editingBody: false, 
  }

  componentDidMount() {
    const { user } = this.props.auth
    const { course_id, unit_id, id } = this.props.match.params
    axios.get(`/api/units/${unit_id}/assignments/${id}/get_assignment_with_attrs`)
      .then( res => {
        this.setState( res.data )
      })
    if (user.admin) {
      axios.get(`/api/assignments/${id}/assignment_submissions`)
        .then( res => {
          res.data.map( (submission) => {
            axios.get(`/api/assignments/${id}/assignment_submissions/${submission.id}/find_user`)
              .then( res => {
                this.setState({ submissions: [...this.state.submissions, {...submission, user: res.data}] })
              })
          })
        })
    } else {
      axios.get(`/api/courses/${course_id}/assignments/${id}/assignment_submissions/show_user_submission`)
        .then( res=> {
            if(res.data !== null) { 
              this.setState({userSubmission: true})
            }
        })
    }
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  updateAssignmentBody = assignmentData => {
    const { id } = this.props.match.params;
    axios
      .put(`/api/assignments/${id}`, assignmentData)
      .then(res => {
        this.setState({ body: res.data.body, kind: res.data.kind, editingBody: false });
      })
      .catch(err => alert(err));
  };

  updateAssignmentTitle = assignmentTitle => {
    const { id } = this.props.match.params;
    axios
      .put(`/api/assignments/${id}`, assignmentTitle)
      .then(res => {
        this.setState({ title: res.data.title, editingTitle: false });
      })
      .catch(err => alert(err));
  };

  deleteAssignment = id => {
    axios
      .delete(`/api/assignments/${id}`)
      .then(res => {
        this.props.history.goBack();
      })
      .catch(err => console.log(err));
  };

  renderAdminView = () => {
    const { id } = this.props.match.params
    return (
      <> 
        <ListHeader>
          Student Submissions
        </ListHeader>
        <SubmissionContainer>
          {this.state.submissions.map((submission, index) => {
            return (
              <Link
                to={`/assignments/${id}/submissions/${submission.id}`}
                key={index}
              >
                <div>
                  {submission.user.first_name} {submission.user.last_name}
                </div>
              </Link>
            )
          })}
        </SubmissionContainer>
      </>
    )
  };

  renderStudentView = () => {
    const { match, auth } = this.props
    const { userSubmission, kind, points_possible } = this.state
    return (
        userSubmission ?
          <UserSubmissionView
            kind={kind}
            assignment_id={match.params.id} 
            course_id={match.params.course_id}
            user={auth.user}
            toggleSubmission={this.toggleUserSubmission}
          /> 
        : 
          <AssignmentSubmissionForm 
            kind={kind} 
            assignment_id={match.params.id} 
            user={auth.user} 
            course_id={match.params.course_id}
            points_possible={points_possible}
            toggle={this.toggleUserSubmission}
          />  
    )
  }

  toggleEditingBody = () => {
    this.setState({ editingBody: !this.state.editingBody });
  }

  toggleEditingTitle = () => {
    this.setState({ editingTitle: !this.state.editingTitle });
  };

  toggleUserSubmission = () => {
    this.setState({ userSubmission: !this.state.userSubmission });
  }

  render() {
    const { id, title, body, kind, due_date, points_possible, editingTitle, editingBody, userSubmission } = this.state;
    const { auth: { user, } } = this.props;
    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
          {" "}{!editingTitle && title}
        </Header>
        { user.admin ?
          <> 
            {!editingTitle ? (
              <SectionEditButtons>
                <BlueLink onClick={() => this.toggleEditingTitle()}>
                  Edit Name
                </BlueLink>
                <span style={{ color: "#0029ff", fontSize: "0.7rem" }}>
                  &nbsp;or&nbsp;
                </span>
                <BlueLink onClick={() => this.deleteAssignment(id)}>
                  Delete
                </BlueLink>
              </SectionEditButtons>
            ) : (
              <EditAssignmentTitle
              title={title}
              updateAssignmentTitle={this.updateAssignmentTitle}
              />
              )}
          </>
        :
          <></> 
        }
        <br />
        <AssignmentContainer>
          <AssignmentHeading>
            <h2 style={{margin: "0", color: "#23a24d", fontSize: "1.75rem"}} >Instructions</h2>
            <div style={{display: "flex", alignItems: "center"}}>
              <Moment format='ddd, MMM D, LT' date={due_date} style={styles.dueDate} /> 
            </div>
          </AssignmentHeading>
          <StyledHr/>
        {editingBody ? (
            <EditAssignmentBody
              body={body}
              kind={kind}
              points_possible={points_possible}
              updateAssignmentBody={this.updateAssignmentBody}
            />
          ) : (
            <>
              { userSubmission ?
                <></>
              :    
                <Instructions>Points Possible: {points_possible}</Instructions>    
              }
              <Instructions
                dangerouslySetInnerHTML=
                {this.createMarkup(body)}
                style={{padding: '15px'}}
              />
            </>
          )}
          { user.admin ?
            <>
              {this.renderAdminView()}
              {editingBody? 
                <ButtonGreen onClick={() => this.toggleEditingBody()}>
                  Cancel Edit 
                </ButtonGreen>
              : 
                <ButtonGreen onClick={() => this.toggleEditingBody()}>
                  Edit Content
                </ButtonGreen>
              }
            </>
          :
            <>
              {this.renderStudentView()}
            </>
          }
        </AssignmentContainer>
      </>
    )
  }
}

class connectAssignmentView extends React.Component {
  render(){
    return(
      <AuthConsumer>
        {auth => <AssignmentView {...this.props} auth={auth}/>}
      </AuthConsumer>
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

const StyledHr = styled.hr`
  border: none;
  height: 2px;
  width: 100%;
  background-color: #23a24d;
  margin: 1rem 0;
`

const SectionEditButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 2rem;
`

const styles = {
  dueDate: {
      fontSize: "1.75rem",
      color: "#23a24d",
      marginRight: "2rem",
  }
}

const BlueLink = styled.button`
  display: inline-block;
  text-decoration: none;
  background-color: transparent;
  border: none;
  color: #2979ff;
  font-family: "Poppins";
  font-size: 0.7rem;
  letter-spacing: 1px;
  cursor: pointer;

  :hover {
    color: grey;
  }

  :active {
    color: darkgrey;
  }
`;

const SubmissionContainer = styled.div`
    width: 95%;
    margin: 0 auto 3rem auto;
    padding: 1.25rem;
    text-align: left;
    border-radius: 10px;
`

const ListHeader = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-family: "Poppins";
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
`

export default connectAssignmentView