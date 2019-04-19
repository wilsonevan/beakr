import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Code from './Code';
import styled from 'styled-components';
import { ButtonGreen } from '../styles/Components';

class AssignmentSubmissionForm extends React.Component {
  state = { body: '', code: '', url: '', points_awarded: 0 }

  componentDidMount() {
    const { id, body, code, url, } = this.props
    if (id)
      this.setState({ body, code, url, })
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
    const { toggle, assignment_id, course_id, id, points_possible } = this.props;
    const { body, code, url} = this.state
    const assignment_submission = {...this.state, course_id, points_possible};
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
          <>
            <h5>
              Submission URL
            </h5>
            <BodyInput
              name='url'
              value={url}
              onChange={this.handleChange}
            />
            <br/>
          </>
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
      <ContainAll>
        <AssignmentContainer>
          <h2 style={{color: '#23A24D'}}>
            Assignment Submission
          </h2>
          {this.renderForm()}
          <br />
          <ReactQuill 
            name='body'
            value={body}
            modules={modules}
            formats={formats}
            onChange={this.handleQuillChange}
            style={{height: '25rem', paddingBottom: '4rem'}}
          />
          <ButtonGreen onClick={this.handleSubmit}>
            Submit
          </ButtonGreen>
          <br/>
        </AssignmentContainer>
      </ContainAll>
    )
  }
}

const ContainAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
  background: #23a24d;
  padding: 2px; 
  border-radius: 2px;
`

const AssignmentContainer = styled.div`
  background: white;
  width: 100%;
  padding: 10px;

`

const BodyInput = styled.input`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 30px;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['color', 'background'],
    ['link', 'code-block', 'image', 'video'],
    ['clean']
  ]
}
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background',
  'list', 'bullet', 'indent',
  'link', 'code-block', 'image', 'video'
]

export default AssignmentSubmissionForm