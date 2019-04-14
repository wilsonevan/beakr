import React from 'react'
import AddContent from './AddContent';
import styled from 'styled-components'
import AddAssignment from './AddAssignment';
import AddQuiz from './AddQuiz';
import DashboardNav from "../DashboardNav";


class AddUnitStuffNav extends React.Component {
  state  = { selected: "content" }

  handleSelected = (selected => {
    this.setState({ selected });
  })


  render() {
    const { selected } = this.state;
    return (
      <>
        <CourseHeading>Add {selected.charAt(0).toUpperCase() + selected.slice(1, selected.length)}</CourseHeading>
        <DashboardNav 
          items={["content", "assignment", "quiz"]}
          content={<AddContent />}
          assignment={<AddAssignment />}
          quiz={<AddQuiz />}
          handleSelected={this.handleSelected}
        />
      </>
    )
  }
}

const CourseHeading = styled.h2`
  color: #23a24d;
  text-align: center;
  font-family: "Poppins";
`;

export default AddUnitStuffNav;