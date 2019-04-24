import React from "react";
import ReactQuill from 'react-quill';
import { ButtonGreen, } from '../styles/Components'
import styled from "styled-components";

class EditContentTitle extends React.Component {
  state = { body: this.props.body };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateContentBody(this.state);
  };

  handleChange = value => {
    this.setState({ body: value })
  };

  render() {
    const { body } = this.state

    return (
      <>
        <ReactQuill 
          name='body'
          value={body}
          modules={modules}
          formats={formats}
          onChange={this.handleChange} 
          style={{height: '25rem', paddingBottom: '4rem'}}
        />
        <ButtonGreen onClick={this.handleSubmit}>
          Update
        </ButtonGreen>
      </>
    );
  }
}

const BlueLink = styled.button`
  margin-left: 1rem;
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
