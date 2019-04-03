import React from "react";
import "./coursework.css";
import CourseSection from "./CourseSection";

class CourseWork extends React.Component {
  state = {
    courses: [
      { title: "week1" },
      { title: "week2" },
      { title: "week3" },
      { title: "week4" },
      { title: "week5" }
    ]
  };

  renderSections = () => {
    return this.state.courses.map((course, index) => {
      return <CourseSection key={index} title={course.title} />;
    });
  };

  render() {
    return (
      <>
        <div className="course-work__container">
          <div className="section-container">
            <h2 className="section-heading">Course Work</h2>

            {this.renderSections()}
          </div>
        </div>
      </>
    );
  }
}

export default CourseWork;
