import React from "react";
import styled from "styled-components";
import axios from "axios";

class EditUnitTitle extends React.Component {
  state = { title: this.props.unit.title };

  timeout = null;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      console.log(this.state.title);
      axios
        .put(
          `/api/sections/${this.props.section.id}/units/${this.props.unit.id}`,
          this.state
        )
        .then(res => {
          this.props.updateUnit(res.data);
        })
        .catch(err => console.log(err));
    }, 400);
  };

  render() {
    return (
      <>
        <UnitNameInput
          id={"unit-title"}
          type="text"
          value={this.state.title}
          name="title"
          onChange={this.handleChange}
        />
      </>
    );
  }
}

const UnitNameInput = styled.input`
  width: 50%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.5rem;
  height: 2.5rem;
  padding: 0.25rem 0.5rem;
  color: grey;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`;

export default EditUnitTitle;
