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
        <TitleLabel htmlFor="unit-title">Unit Title:</TitleLabel>
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
  width: 90%;
  background-color: white;
  border: none;
  border-radius: 100px;
  outline: none;
  padding: 0.25rem 0 0.25rem 10rem;
  font-size: 1.5rem;
  color: grey;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`;

const TitleLabel = styled.label`
  position: absolute;
  transform: translateY(-50%);
  left: 3rem;
  top: 57.5%;
  color: grey;
  font-size: 1.5rem;
`;

export default EditUnitTitle;
