import React from 'react'
import AddContent from './AddContent';
import styled from 'styled-components'
import AddAssignment from './AddAssignment';
import AddQuiz from './AddQuiz';


class AddUnitStuffNav extends React.Component {
state = { active: 'Content'}


  highlightIf = (item) => {
    
    const {active} = this.state
     if (item === active){
      return { backgroundColor: "rgba(0,0,0,0.1)" };
    }
    return { backgroundColor: "#23a24d" }
  };


  renderItems = () => {
    const { active, } = this.state
    switch (active) {
      case "Content":
        return <AddContent />
        break
      case "Assignment":
        return <AddAssignment />
        break
      case "Quiz":
        return <AddQuiz />
        break
    }
  }


  render() {
    const { active } = this.state
    return (
      <>
      <CourseHeading>Add {active}</CourseHeading>
      <NavContainer style={{marginBottom: 0}}>
        <AdminItem
          style={this.highlightIf("Content")}
          onClick={() => this.setState({active: 'Content'})}
          >
          Content
        </AdminItem>
        <AdminItem
          style={this.highlightIf("Assignment")}
          onClick={() => this.setState({active: 'Assignment'})}
          >
          Assignment
        </AdminItem>
        <AdminItem
          style={this.highlightIf("Quiz")}
          onClick={() => this.setState({active: 'Quiz'})}
          >
          Quiz
        </AdminItem>
      </NavContainer>
      <AdminControlsContainer>
        <AdminControls>
          {this.renderItems()}
        </AdminControls>
      </AdminControlsContainer>
      </>
    );
  }
}

const NavContainer = styled.div`
  width: 100%;
  background-color: #23a24d;
  overflow: hidden;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  margin-bottom: 2rem;
`;

const AdminItem = styled.button`
  heght: 100%;
  background-color: transparent;
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-family: "Poppins";
  font-size: 1.3rem;
  letter-spacing: 2.5px;
  cursor: pointer;
  transition-duration: 0.1s;
  outline: none;

  :hover {
    background-color: #41c36c;
  }

  :active {
    color: #23a24d;
    background-color: white;
  }
`
const AdminControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const AdminControls = styled.div`
  background-color: white;
  min-height: 20vh;
  border-bottom-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: #23a24d;
  letter-spacing: 2px;
  width: 80%;
`;

const CourseHeading = styled.h2`
  color: #23a24d;
  text-align: center;
  font-family: "Poppins";
`;




export default AddUnitStuffNav;