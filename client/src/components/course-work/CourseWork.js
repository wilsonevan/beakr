import React from "react";
import axios from "axios";
import CourseSection from "./CourseSection";
import styled from "styled-components";
import {Link} from "react-router-dom";

class CourseWork extends React.Component {
  state = { course: {}, sections: [] };

  componentDidMount() {
    axios
      .get(`/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ course: res.data });
        return axios.get(`/api/courses/${this.props.match.params.id}/sections`);
      })
      .then(res => {
        this.setState({ sections: res.data });
      })
      .catch(err => console.log(err));
  }

  renderSections = () => {
    return this.state.sections.map((section, index) => {
      return (
        <CourseSection key={index} title={section.title} section={section} courseId={this.props.match.params.id}/>
      );
    });
  };

  render() {
    const { sections, course } = this.state;
    return (
      <>
        <div as={CourseWorkContainer}>
          <div className="section-container">
            <SectionHeading>
            <Link to='/dashboard' style={{color: '#23a24d'}}>Courses > </Link>
                  {course.title && `${course.title} > Course Work`}
            </SectionHeading>
            {sections.length > 0 && this.renderSections()}
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
  letter-spacing: 2px;
`;

export default CourseWork;
