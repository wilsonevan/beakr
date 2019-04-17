import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Code from './Code';
import { ButtonGreen } from '../styles/Components';
import { Header, Form } from 'semantic-ui-react';

class AssignmentSubmissionForm extends React.Component {
  state = { body: '', code: '', url: '' }

  componentDidMount() {
    const { id, body, code, url } = this.props
    if (id)
      this.setState({ body, code, url })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleCodeChange = (value) => {
    this.setState({ code: value });
  }

  handleQuillChange = (value) => {
    this.setState({ body: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { toggle, assignment_id, course_id, id } = this.props;
    const { body, code, url} = this.state
    const assignment_submission = {...this.state, course_id};
    if (id) {
      axios.put(`/api/assignments/${assignment_id}/assignment_submissions/${id}`, assignment_submission)
        .then(res => {
          toggle(body, url, code)
        })
    } else {
      axios.post(`/api/assignments/${assignment_id}/assignment_submissions`, assignment_submission )
        .then(res => {
          toggle()
        })
    }
  }

  renderForm = () => {
    const { code, url } = this.state
    switch (this.props.kind) {
      case 'url':
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
        return (
          <Code 
            value={code} 
            codeChange={this.handleCodeChange}
            height="100rem"
            width="50rem"
          />
        ) 
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