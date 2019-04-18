import React from "react";
import ReactQuill from 'react-quill';
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
    const { body, points_possible } = this.state

    return (
      <>
        <div>
          Submission Type
        </div>
        <input
          type='radio'
          value='url'
          name='kind'
          id='kind1'
          onClick={this.handleKindChange}
          style={{marginRight: '5px'}}
        />
          <label
            for='kind1'
          >
            URL Submission
          </label>
        <br />
        <input
          type='radio'
          value='code'
          name='kind'
          id='kind2'
          onClick={this.handleKindChange}
          style={{marginRight: '5px'}}
        />
          <label
            for='kind2'
          >
            Code Submission
          </label>
        <br />
        <input
          type='radio'
          value='none'
          name='kind'
          id='kind3'
          onClick={this.handleKindChange}
          style={{marginRight: '5px'}}
        />
          <label
            for='kind3'
          >
            Text Only Submission
          </label>
        <br />
        <br />
        <div>
          Possible Points
        </div>
        <input
          name='points_possible'
          value={points_possible}
          onChange={this.handleChange}
          required
        />
        <br />
        <br />
        <ReactQuill 
          name='body'
          value={body}
          modules={modules}
          formats={formats}
          onChange={this.handleQuillChange} 
          style={{height: '25rem', paddingBottom: '4rem'}}
        />
        <BlueLink onClick={this.handleSubmit}>
          Update
        </BlueLink>
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

export default EditContentTitle;
