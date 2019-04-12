import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"

class AdminControlsNav extends React.Component {
  highlightIf = itemName => {
    if (this.props.selected !== itemName) return null;
    return { backgroundColor: "rgba(0,0,0,0.1)" };
  };

  handleClick = selected => {
    this.props.setSelected(selected);
  };

  render() {
    return (
      <NavContainer>
        <AdminItem
          style={this.highlightIf("edit")}
          onClick={() => this.handleClick("edit")}
        >
          Edit
        </AdminItem>
        <Link to={`/courses/${this.props.courseId}`} >
          <AdminItem>View</AdminItem>
        </Link>
        <AdminItem
          style={this.highlightIf("students")}
          onClick={() => this.handleClick("students")}
        >
          Student Grades
        </AdminItem>
        <AdminItem
          style={this.highlightIf("attendance")}
          onClick={() => this.handleClick("attendance")}
        >
          Attendance
        </AdminItem>
      </NavContainer>
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
`;

export default AdminControlsNav;
