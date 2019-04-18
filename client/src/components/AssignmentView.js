import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import { Segment, Header, Icon, } from 'semantic-ui-react';
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
    const { course_id, id } = this.props.match.params
    axios.get(`/api/assignments/${id}`)
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
      .catch(err => console.log(err));
  };

  updateAssignmentTitle = assignmentTitle => {
    const { id } = this.props.match.params;
    axios
      .put(`/api/assignments/${id}`, assignmentTitle)
      .then(res => {
        this.setState({ title: res.data.title, editingTitle: false });
      })
      .catch(err => console.log(err));
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
    return this.state.submissions.map((submission, index) => {
      return (
        <Link
          to={`/assignments/${id}/submissions/${submission.id}`}
          key={index}
        >
          <div>
            {submission.user.first_name} {submission.user.last_name}
          </div>
        </Link>
      );
    });
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
          {!editingTitle && title}
        </Header>
        { user.admin ?
          <> 
            {!editingTitle ? (
              <>
                <BlueLink onClick={() => this.toggleEditingTitle()}>
                  Edit Name
                </BlueLink>
                <span style={{ color: "#0029ff", fontSize: "0.7rem" }}>
                  &nbsp;or&nbsp;
                </span>
                <BlueLink onClick={() => this.deleteAssignment(id)}>
                  Delete
                </BlueLink>
              </>
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
        <Moment format='ddd, MMM D, LT' date={due_date} />
        <Segment>
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
                <div>Points Possible: {points_possible}</div>    
              }
              <div 
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
                <BlueLink onClick={() => this.toggleEditingBody()}>
                  Cancel Edit 
                </BlueLink>
              : 
                <BlueLink onClick={() => this.toggleEditingBody()}>
                  Edit Content
                </BlueLink>
              }
            </>
          :
            <>
              {this.renderStudentView()}
            </>
          }
        </Segment>
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

export default connectAssignmentView