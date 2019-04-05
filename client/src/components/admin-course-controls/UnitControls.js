import React from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonGreen, ButtonBlue } from "../../styles/Components";

class UnitControls extends React.Component {
  state = { editing: false, title: this.props.unit.title };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { unit } = this.props;
    if (!this.state.editing)
      return (
        <UnitText onClick={() => this.toggleEditing()}>{unit.title}</UnitText>
      );
    else
      return (
        <UnitForm onSubmit={this.handleSubmit}>
          <FormTop>
            <UnitNameInput
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />

            <div>
              <ButtonGreen
                onClick={() => this.toggleEditing()}
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "1rem"
                }}
              >
                Finished
              </ButtonGreen>
              <ButtonBlue
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "1rem"
                }}
              >
                Delete
              </ButtonBlue>
            </div>
          </FormTop>
        </UnitForm>
      );
  }
}

const UnitText = styled.p`
  color: grey;
  letter-spacing: 2px;
  font-size: 1.5rem;
  margin-left: 5%;
  cursor: pointer;
  transition-duration: 0.1s;

  :hover {
    color: #0029ff;
  }
`;

const UnitForm = styled.form`
  width: 90%;
  margin: 0 auto 1rem auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
`;

const FormTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  min-height: 3rem;
  background-color: #bdbdbd;
  color: white;
`;

const UnitNameInput = styled.input`
  background-color: white;
  border: none;
  border-radius: 100px;
  outline: none;
  padding-left: 1rem;
  font-size: 1.5rem;
  color: grey;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`;

export default UnitControls;
