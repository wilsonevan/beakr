import React from "react";
import styled from "styled-components";

class EditAssignmentTitle extends React.Component {
  state = { title: this.props.title };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateAssignmentTitle(this.state);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <TitleForm onSubmit={this.handleSubmit}>
        <TitleInput
          type="text"
          placeholder="Assignment Name"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <BlueLink>Update</BlueLink>
      </TitleForm>
    );
  }
}

const TitleForm = styled.form`
  display: inline-block;
  margin: 0 0.25rem 3rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const TitleInput = styled.input`
  padding-left: 1rem;
  background-color: white;
  color: #23a24d;
  border: none;
  border-radius: 100px;
  font-family: "Poppins";
  font-weight: 600;
  letter-spacing: 2px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

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

export default EditAssignmentTitle;
