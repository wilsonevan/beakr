import React from "react";
import axios from "axios";
import "./coursework.css";
import CourseSection from "./CourseSection";
import styled from "styled-components";

class CourseWork extends React.Component {
  state = { sections: [] };

  componentDidMount() {
    axios
      .get(`/api/courses`)
      .then(res =>
        axios.get(`/api/courses/${this.props.match.params.id}/sections`)
      )
      .then(res => {
        this.setState({ sections: res.data });
      })
      .catch(err => console.log(err));
  }

  renderSections = () => {
    return this.state.sections.map((section, index) => {
      return (
        <CourseSection key={index} title={section.title} section={section} />
      );
    });
  };

  render() {
    return (
      <>
        <div as={CourseWorkContainer}>
          <div className="section-container">
            <h2 className="section-heading">Course Work</h2>
            {this.state.sections.length > 0 && this.renderSections()}
          </div>
        </div>
      </>
    );
  }
}

const CourseWorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #23a24d;
  font-family: "Poppins", sans-serif;
  letter-spacing: 2px;
`;

export default CourseWork;
