import React from 'react';
import styled from 'styled-components';
import { ButtonGreen, ButtonGrey, } from '../styles/Components';

class GradeSubmission extends React.Component {
  state = { points_possible: this.props.points_possible, points_awarded: this.props.points_awarded, graded: true }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { submitGrade } = this.props
    const { points_possible, points_awarded } = this.state
    let grade = ((points_awarded/points_possible) * 100)
    const assignment_submission = {...this.state, grade}
    submitGrade(assignment_submission)
  }

  render() {
    const { points_awarded, points_possible } = this.state 
    return(
      <TitleForm onSubmit={this.handleSubmit}>
        <TitleInput
          type="integer"
          name="points_awarded"
          value={points_awarded}
          onChange={this.handleChange}
        />
        / {points_possible}
        <br />
        <br />
        <ButtonGreen>Submit Grade</ButtonGreen>
        <ButtonGrey onClick={this.props.toggle}>Cancel Grade</ButtonGrey>
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

export default GradeSubmission