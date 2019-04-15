import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { ButtonGreen } from '../styles/Components';
import { Header, Form } from 'semantic-ui-react';

class AssignmentSubmissionForm extends React.Component {
  state = { body: '', code: '', url: '' }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleQuillChange = (value) => {
    this.setState({ body: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { history, assignment_id, user, courseId } = this.props;
    const assignment_submission = {...this.state, course_id: courseId};
    axios.post(`/api/assignments/${assignment_id}/assignment_submissions`, assignment_submission )
      .then(res => {
        history.push(`/users/${user.id}/asubmission/${res.data.id}`)
      })
  }

  renderForm = () => {
    const { code, url } = this.state
    switch (this.props.kind) {
      case 'github':
        return (
          <Form>
            <Form.Input
              label='Submission URL'
              name='url'
              value={url}
              onChange={this.handleChange}
            />
          </Form>  
        )
      case 'code':
        // CODEMIRROR COMPONENT
      default:
        break
    };
  }

  render() {
    const { body } = this.state

    return (
      <>
        <Header style={{color: '#23A24D'}} content='Assignment Submission' />
        {this.renderForm()}
        <br />
        <ReactQuill 
          name='body'
          value={body}
          onChange={this.handleQuillChange}
          style={{height: '25rem', paddingBottom: '4rem'}}
        />
        <ButtonGreen onClick={this.handleSubmit}>
          Submit
        </ButtonGreen>
      </>
    )
  }
}

export default AssignmentSubmissionForm