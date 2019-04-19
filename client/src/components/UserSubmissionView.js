import React from 'react';
import axios from 'axios';
import Code from './Code';
import { Divider } from 'semantic-ui-react';
import { ButtonGreen, ButtonGrey } from '../styles/Components';
import AssignmentSubmissionForm from './AssignmentSubmissionForm';

class UserSubmissionView extends React.Component {
  state = { 
    id: '', body: '', url: '', code: '', kind: '', 
    points_awarded: '', points_possible: '', grade: '',
    editing: false, warning: false 
  }

  componentDidMount() {
    const { course_id, assignment_id, kind } = this.props
    axios.get(`/api/courses/${course_id}/assignments/${assignment_id}/assignment_submissions/show_user_submission`)
        .then( res=> {
          this.setState({ ...res.data, kind })
    })
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  deleteSubmission = () => {
    const { assignment_id, toggleSubmission } = this.props
    const { id } = this.state
    axios.delete(`/api/assignments/${assignment_id}/assignment_submissions/${id}`)
      .then( res => {
        toggleSubmission()
      }) 
  }

  renderSubmission = () => {
    const { kind, body, url, code } = this.state
    switch(kind) {
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
          <>
            <Code value={code} />
            <div 
              dangerouslySetInnerHTML=
              {this.createMarkup(body)}
              style={{padding: '15px'}}
            />
          </>
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

  toggleDelete = () => {
    this.setState({ warning: !this.state.warning })
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  toggleEditForm = (body, url, code) => {
    this.setState({ body, url, code, editing: !this.state.editing })
  }

  render() {
    const { editing, warning, body, url, code, kind, id, points_awarded, points_possible, grade } = this.state
    const { assignment_id, course_id, user } = this.props 

    return (
      <>
        <Divider />
        <div>
          {points_awarded}/{points_possible}
        </div>
        <div>
          Grade: {grade}%
        </div>
        <br/>
        { editing ?
          <AssignmentSubmissionForm
            id={id}
            body={body}
            url={url}
            code={code}
            kind={kind}
            toggle={this.toggleEditForm}
            assignment_id={assignment_id} 
            course_id={course_id}
            user={user}
          />
        :
          <>
            {this.renderSubmission()}
          </>
        }
        <br/>
        { editing ?
          <ButtonGreen onClick={this.toggleEdit}>
            Cancel Edit
          </ButtonGreen>
        :
          <ButtonGreen onClick={this.toggleEdit}>
            Edit Submission
          </ButtonGreen>
        }
        { warning ?
          <ButtonGrey onClick={this.deleteSubmission}>
          Are You Sure?
          </ButtonGrey>
          :
          <ButtonGrey onClick={this.toggleDelete}>
            Delete Submission
          </ButtonGrey>  
        }
      </>
    )
  }
}

export default UserSubmissionView