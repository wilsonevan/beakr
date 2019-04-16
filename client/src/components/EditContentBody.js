import React from "react";
import ReactQuill from 'react-quill';
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
          onChange={this.handleChange} 
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
  color: #0029ff;
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

export default EditContentTitle;
