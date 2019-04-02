import React from "react";
import "../coursework.css";
import CourseSection from "./CourseSection";

class CourseWork extends React.Component {
  state = { names: ["week1", "week2", "week3", "week4", "week5"] };

  renderSections = () => {
    return this.state.names.map((name, index) => {
      return <CourseSection key={index} name={name} />;
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
