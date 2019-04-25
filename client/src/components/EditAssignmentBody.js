import React from "react";
import ReactQuill from 'react-quill';
import { ButtonGreen } from '../styles/Components';
import styled from "styled-components";

class EditContentTitle extends React.Component {
  state = { body: this.props.body, kind: this.props.kind, points_possible: this.props.points_possible };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateAssignmentBody(this.state);
  };

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleQuillChange = (value) => {
    this.setState({ body: value })
  };

  handleKindChange = (e) => {
    const { value } = e.target
    this.setState({ kind: value })
  };

  render() {
    const { body, kind, points_possible } = this.state

    return (
      <>
      <ContainAll>
          <AssignmentContainer>
            <FiftyDiv>
              <h2>
                Submission Type
              </h2>
              <TypeInput
                required
                autoFocus
                name='kind'
                value={kind}
                onChange={this.handleChange}
                placeholder='kind' >
                  <option value='url'>URL</option>
                  <option value='code'>Code</option>
                  <option value='none'>Text</option>
              </TypeInput>
            </FiftyDiv>
            <FiftyDiv>
              <h2>
                Points Possible
              </h2>
              <BodyNumberInput
                name='points_possible'
                value={points_possible}
                onChange={this.handleChange}
                required
              />
            </FiftyDiv>
            <h2>
              Assignment Instructions
            </h2>
            <ReactQuill 
              name='body'
              value={body}
              modules={modules}
              formats={formats}
              onChange={this.handleQuillChange}
              style={{height: '25rem', paddingBottom: '4rem'}}
            />
          </AssignmentContainer>
        </ContainAll>
        <ButtonGreen style={{marginTop: '10px'}} onClick={this.handleSubmit}>
          Save Changes
        </ ButtonGreen>
      </>
    );
  }
}

const ContainAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
  background: #23a24d;
  padding: 1%; 
  border-radius: 5px;
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
  font-size: 1.5rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 30px;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`

const BodyNumberInput = styled.input`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.5rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 30px;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`

const FiftyDiv = styled.div`
    width: 50%;
    padding: 5px;
    display: inline-block;

  `

const TypeInput = styled.select`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1.5rem;
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
     [{'color': []}, {'background': []}],
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

export default EditContentTitle;
